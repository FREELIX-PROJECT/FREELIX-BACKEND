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

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
});

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date, 
        default: Date.now
    },

    expiresAt: {
        type: Date,
        required: true
    }
});
// Create a (Time To Live (TTL)) index that expires documents after 5 mins
blacklistSchema.index({createdAt: 1}, {expireAfterSeconds:300}); //300 seconds = 5 mins

userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema);

export const BlacklistModel = model('Blacklist', blacklistSchema);
// model.exports = BlacklistModel;