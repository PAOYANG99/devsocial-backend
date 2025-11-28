const mongoose = require('mongoose')    
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        profilePicturePublicId: {
            type: String,
            default: ''
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    
)

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPassword = async function(EnteredPassword) {
    return await bcrypt.compare(EnteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)