import mongoose, { Schema } from "mongoose";

const reqfield = {
    type: String,
    required: true
}

const setlogchannel = new Schema({
    _id: reqfield,
    channelID: reqfield,
})

const name = 'Log Channel';

export default  mongoose.models[name] || mongoose.model(name, setlogchannel, name);