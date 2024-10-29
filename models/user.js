import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    avatar: {
        type: String
    },

    fullName: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    // repeatPassword: {
    //     type: String,
    //     required: true,
    //     ref
    // },

    phone: {
        type: String,
        required: true
    },

    personalID: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        default: 'user',
        enum: [
            'user',
            'freelancer',
            'manager',
            'admin'
        ]
    }
}, {
    timestamps: true,
});

userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema);