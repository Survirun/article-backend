import mongoose from "mongoose";
const { Schema } = mongoose;

const report = new Schema({
    articleId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    report: [{
        uid: String,
        reason: String
    }]
});

const Report =  mongoose.model("report", report);

export default {
    addReport: async (articleId: string, uid: string, reason: string) => {
        const exist = await Report.findOne({articleId: articleId});
        if(exist) {
            const duplicate = exist.report.some(it => it.uid == uid);
            if(!duplicate) {
                await Report.updateOne(
                    {articleId: articleId},
                    {$addToSet: {
                        report: {uid: uid, reason: reason}
                    }}
                );
                return true;
            }
        } else {
            const newReport = new Report({
                articleId: articleId,
                report: [{ uid: uid, reason: reason }]
            });
            await newReport.save();
            return true;
        }
        return false;
    }
}

