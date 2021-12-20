import mongoose, { Schema } from "mongoose";

const reqfield = {
    type: String,
    required: true
}

const welcomeSchema = new Schema({
    _id: reqfield,
    channelID: reqfield,
    text: reqfield
})

const name = 'Welcome message';

export default  mongoose.models[name] || mongoose.model(name, welcomeSchema, name);
