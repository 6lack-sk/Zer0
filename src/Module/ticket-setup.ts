import mongoose, { Schema } from "mongoose";

const reqfield = {
    type: String,
    required: true
}

const ticketsetup = new Schema({
    _id: reqfield,
    categoryID: reqfield,
    channelID: reqfield,
    tstaffID: reqfield,
},
{
    timestamps: true
})

const name = 'ticketsetups';

export default  mongoose.models[name] || mongoose.model(name, ticketsetup, name);