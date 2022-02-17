import mongoose, { Schema } from "mongoose";

const reqfield = {
    type: String,
    required: true
}

const tickets = new Schema({
    guildID: reqfield,
    ChannelID: reqfield,
    UserID: reqfield
},
{
    timestamps: true
})

const name = 'tickets';

export default  mongoose.models[name] || mongoose.model(name, tickets, name);