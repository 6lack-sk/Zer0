import mongoose, { Schema } from "mongoose";

const reqfield = {
    type: String,
    required: true
}

const punishment = new Schema({
    userID: reqfield,
    guildID: reqfield,
    staffID: reqfield,
    reason: reqfield,
    expires: Date,
    type: {
        type: String,
        required: true,
        enum: ['mute']
    }
},
{
    timestamps: true
})

const name = 'punishment';

export default  mongoose.models[name] || mongoose.model(name, punishment, name);