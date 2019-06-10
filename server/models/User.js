const bcrypt = require('bcrypt-nodejs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

module.exports = mongoose => {
  const UserSchema = new mongoose.Schema({
    nickname: {
      type: String,
      required: 'Field "user name" is required!',
      trim: true,
      minlength: [3, 'Minimum "user name" field length is 3 characters'],
      maxlength: [90, 'Maximum "user name" field length is 90 characters'],
    },
    gender: {
      trim: true,
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Field "gender" must be "Male" or "Female"',
      },
      required: 'Field "gender" is required!',
    },
    age: {
      trim: true,
      min: [new Date('1900-01-01'), 'You did not specify a valid date of birth.'],
      max: [Date.now, 'You did not specify a valid date of birth.'],
      type: Date,
      required: 'Field "age" is required!',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: 'This email address alrady use.',
      required: 'Email address is required',
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      minlength: [3, 'Minimum "Email" field length is 3 characters '],
      maxlength: [254, 'Maximum "Email" field length is 254 characters '],
    },
    password: {
      type: String,
      required: 'Field "Password" is required!',
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        'Password field must contain at least one number, one lowercase, one uppercase letter and least six characters',
      ],
      minlength: [6, 'Minimum "Password" field length is 6 characters '],
      trim: true,
      maxlength: [254, 'Maximum "Password" field length is 254 characters '],
    },
    confirm_token: String,
    reset_token_expires: Date,
    reset_token: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  UserSchema.plugin(beautifyUnique);
  UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
        next();
      });
    });
  });

  UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  };

  return UserSchema;
};
