import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: [
            'Pending',
            'In progress',
            'Completed'
        ],
        default: 'Pending'
    },
    hoursLogged: { type: Number, default: 0 }

},
    { timestamps: true }
)

taskSchema.plugin(toJSON);

export const TaskModel = model('Task', taskSchema)