import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const projectSchema = new Schema({
    title: {type: String, required: true},
    description: { type: String, required: true },
    client: { type: String, required: true },
    freelancer: { type: String, required: true },
    // freelancer: {type: Types.ObjectId,
    //      ref: 'User'},
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed', 'closed'],
        default: 'open'
    },
    budget: { type: Number, required: true },
    deadline: { type: Date },
}, 
    {
        timestamps: true,
    })

projectModel.plugin(toJSON);

    export const projectModel = ('Project', projectSchema);