import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from '../models';
import bcrypt from 'bcrypt-nodejs';

const ONE_WEEK = 60 * 60 * 24 * 7;

function jwtSignUser(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: ONE_WEEK
    });
}

export default {
    async register(req, res) {
        res.status(200);
        try {
            const user = new User(req.body);
            user.confirm_token = crypto.randomBytes(20).toString('hex');
            await user.validate();
            const userData = await user.save();

            res.cookie('jwt', jwtSignUser(userData.toJSON()), {
                httpOnly: false,
                maxAge: ONE_WEEK * 1000,
                expires: new Date(Date.now() + ONE_WEEK * 1000)
            });

            res.json({
                user: userData
            });
        } catch (e) {
            res.status(400).json(e.errors);
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    email: { message: 'User with such email not found!' }
                });
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return res
                    .status(400)
                    .json({ password: { message: 'Incorrect password' } });
            }
            res.cookie('jwt', jwtSignUser(user.toJSON()), {
                httpOnly: false,
                maxAge: ONE_WEEK * 1000,
                expires: new Date(Date.now() + ONE_WEEK * 1000)
            });
            res.json({
                user: user.toJSON()
            });
        } catch (e) {
            res.status(500).json({
                server: { message: 'An error has occured trying to log in' }
            });
        }
    },
    async put(req, res) {
        try {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(10);
                const hash = await bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;
            }

            const user = await User.findByIdAndUpdate(req.user.id, req.body, {
                new: true
            });

            res.cookie('jwt', jwtSignUser(user.toJSON()), {
                httpOnly: false,
                maxAge: ONE_WEEK * 1000,
                expires: new Date(Date.now() + ONE_WEEK * 1000)
            });

            return res.json({
                user
            });
        } catch ({ errors }) {
            return res.status(500).json(errors);
        }
    },
    async logout(req, res) {
        req.logout();
        res.clearCookie('jwt');

        res.status(200).json({ server: { message: 'success' } });
    },

    async forgot(req, res) {
        const resetToken = crypto.randomBytes(20).toString('hex');
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                email: { message: 'User with such email not found!' }
            });
        }

        user.reset_token = resetToken;
        user.reset_token_expires = Date.now() + 3600000; // 1 hour
        const updatedUser = await user.save();
        const smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: 'gmail',
                pass: 'passowrd'
            }
        });
        const mailOptions = {
            to: updatedUser.email,
            from: 'todolist@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        http://${req.headers.host}/reset/${resetToken}
        If you did not request this, please ignore this email and your password will remain unchanged.`
        };
        smtpTransport.sendMail(mailOptions, err => {
            if (err)
                return res.status(400).json('Having trouble sending email');
            res.json(
                `An e-mail has been sent to ${
                    user.email
                } with further instructions.`
            );
        });
    }
};
