module.exports = mongoose => {
    return new mongoose.Schema({
        completed: {
            type: Boolean,
            default: false
        },
        value: String,
        user_id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });
};
