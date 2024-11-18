import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const taskSchema = new Schema({
    // title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: [
            'in progress',
            'done',
            'closed'
        ],
        default: 'in progress'
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
    // assignedTo: { type: Types.ObjectId, ref: 'User' },
    // hoursLogged: { type: Number, default: 0 }

},
    { timestamps: true }
)

taskSchema.plugin(toJSON);

export const TaskModel = model('Task', taskSchema)