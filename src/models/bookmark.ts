import mongoose from "mongoose";
const { Schema } = mongoose;

const bookmark = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    bookmarks: {
        type: [String],
        default: []
    }
})

const Bookmark = mongoose.model('bookmark', bookmark);

export default {
    getBookmark: async (uid: string) => {
        const bookmark = await Bookmark.findOne({uid: uid}, {_id: 0, __v: 0})
        if(!bookmark) {
            await new Bookmark({uid: uid}).save()
            return []
        }
        //@ts-ignore
        return bookmark.bookmarks
    },
    addBookmark: async (uid: string, articleId: string) => {
        return await Bookmark.updateOne({uid: uid}, {$addToSet: {bookmarks: articleId}}, { upsert: true })
    },
    removeBookmark: async (uid: string, articleId: string) => {
        return await Bookmark.updateOne({uid: uid}, {$pull: {bookmarks: articleId}}, { upsert: true })
    },
    isAlreadyIn: async (uid: string, articleId: string) => {
        return !!(await Bookmark.findOne({uid: uid, bookmarks: {$in: [articleId]}}))
    }
}