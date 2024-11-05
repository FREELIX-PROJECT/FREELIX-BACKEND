import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const freelanceSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['freelancer', 'client'], required: true, default: freelancer },
    profilePicture: { type: String },
    bio: { type: String },
    skills: { type: [String] },
    hourlyRate: { type: Number }
})

freelanceSchema.plugin(toJSON);

export const FreelanceModel = ('Freelancer', freelanceSchema)