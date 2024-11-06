import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const projectSchema = new Schema({
    projectName: { type: String, required: true },
    clientName: { type: String, required: true },
    projectBegins: { type: Date },
    projectDeadline: { type: Date },
    projectBudget: { type: Number, required: true },
    description: { type: String, required: true },
    // freelancer: { type: String, required: true },
    freelancer: { type: Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed', 'closed'],
        default: 'open'
    },
},
    {
        timestamps: true,
    })

projectModel.plugin(toJSON);

export const projectModel = model('Project', projectSchema);