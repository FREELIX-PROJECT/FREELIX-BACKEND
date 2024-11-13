import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const taskSchema = new Schema({
    // title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: [
            'In progress',
            'Done',
            'Closed'
        ],
        default: 'In progress'
    }
    // assignedTo: { type: Types.ObjectId, ref: 'User' },
    // hoursLogged: { type: Number, default: 0 }

},
    { timestamps: true }
)

taskSchema.plugin(toJSON);

export const TaskModel = model('Task', taskSchema)