import mongoose, { Schema } from "mongoose";

const reqfield = {
    type: String,
    required: true
}

const autoroleschema = new Schema({
    _id: reqfield,
    autoroleID: reqfield,
},
{
    timestamps: true
})

const name = 'autoroles';

export default  mongoose.models[name] || mongoose.model(name, autoroleschema, name);