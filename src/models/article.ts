import mongoose from "mongoose";
const { Schema } = mongoose;

const article = new Schema({
    category: {
        type: Number,
        required: true
    },
    keywords: {
        type: [String],
        default: []
    },
    cx: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    displayLink: {
        type: String
    },
    snippet: {
        type: String
    },
    thumbnail: {
        type: String
    },
    date: {
        type: String
    },
    sitename: {
        type: String,
    },
    weight: {
        type: Number
    }

});

const Article = mongoose.model('article', article);

export default {
    getArticles: async (categories: Array<number>) => {
        return await Article.find({category: {$in: categories}}, {__v: 0}).limit(30).lean();
    }
}