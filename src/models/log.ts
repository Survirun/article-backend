import mongoose from "mongoose";
const { Schema } = mongoose;

const log = new Schema({
    uid: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["bookmark", "share", "click"]
    },
    articleId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
});

const Log = mongoose.model("log", log);

export default {
    addLog: async (uid: string, type: string, articleId: string) => {
        return await new Log({uid: uid, type: type, articleId: articleId}).save()
    }
}