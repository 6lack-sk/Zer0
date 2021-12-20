import mongoose, { Schema } from "mongoose";

const reqfield = {
    type: String,
    required: true
}

const warnschema = new Schema({
    userID: reqfield,
    guildID: reqfield,
    staffID: reqfield,
    reason: reqfield
},
{
    timestamps: true
})

const name = 'warns';

export default  mongoose.models[name] || mongoose.model(name, warnschema, name);