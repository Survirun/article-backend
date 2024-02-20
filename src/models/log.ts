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
    },
    addBulkLog: async (uid: string, list: Array<any>) => {
        let operation: Array<any> = [];
        for(let i = 0; i < list.length ; i++) {
            let obj = list[i]
            obj.uid = uid;
            operation.push({ insertOne: {document: obj}})
        }
        return await Log.bulkWrite(operation, {});
    },
    getSelectedLog: async (uid: string, type: string) => {
        const slogs = await Log.find({uid: uid, type: type}, {articleId: 1}).lean();
        return slogs.map(it => it.articleId.toString());
    }
}