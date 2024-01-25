import mongoose from "mongoose";
const { Schema } = mongoose;

const user = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        default: "아티클 유저"
    },
    keywords: {
        type: [String],
        default: []
    }
})

const User = mongoose.model('user', user);

export default {
    isAlreadyRegistered: async (uid: string) => {
        return !!(await User.findOne({uid: uid}))
    },
    createNewUser: async (uid: string, email: string, name: string) => {
        const newUser = new User({
            uid: uid,
            email: email,
            name: name
        });
        return newUser.save();
    },
    getUser: async (uid: string) => {
        return User.findOne({uid: uid},{_id: 0, __v: 0});
    },
    setKeywords: async (uid: string, keywords: Array<string>) => {
        //@ts-ignore
        return User.updateOne({uid: uid}, {$set: {keywords: keywords}});
    }
}