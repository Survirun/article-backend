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
const pageSize = 20;

export default {
    getArticles: async (categories: Array<number>) => {
        return await Article.find({category: {$in: categories}}, {__v: 0}).sort({weight: -1}).limit(30).lean();
    },
    addWeight: async (articleId: string, weight: number) => {
        return await Article.updateOne({_id: articleId}, {$inc: {weight: weight}}).lean();
    },
    addBulkWeight: async (list: Array<any>) => {
        let operation: Array<any> = [];
        for(let i = 0; i < list.length; i++) {
            switch(list[i].type) {
                case "share": 
                    operation.push({
                        updateOne: {
                            filter: {_id: list[i].articleId},
                            update: {$inc: {weight: 30}}
                        }
                    })
                    break;
                case "bookmark":
                    operation.push({
                        updateOne: {
                            filter: {_id: list[i].articleId},
                            update: {$inc: {weight: 20}}
                        }
                    })
                    break;
                case "click":
                    operation.push({
                        updateOne: {
                            filter: {_id: list[i].articleId},
                            update: {$inc: {weight: 10}}
                        }
                    })
                    break;
            }
        }
        return await Article.bulkWrite(operation, {});
    },
    getArticlesAndSubtractClicked: async (categories: Array<number>, alreadyShownIds: Array<any>, passedIds: Array<any>, pageNum: number = 1) => {
        const passedObjectIds = (passedIds) ? passedIds.map(id => new mongoose.Types.ObjectId(id)) : [];
        return await Article.aggregate([
            { $match: { category: { $in: categories } } },
            {
                $addFields: {
                    weightAdjusted: {
                        $cond: [
                            { $in: [ '$_id',  alreadyShownIds] },
                            //{ $subtract: ['$weight', 1000] },
                            0,
                            {
                                $cond: [
                                    { $in: ['$_id', passedObjectIds] },
                                    0,
                                    '$weight'
                                ]
                            }
                        ]
                    }
                }
            },
            { $sort: { weightAdjusted: -1 } },
            { $unset: 'weightAdjusted' },
            { $skip: pageSize * (pageNum - 1) },
            { $limit: pageSize }
        ]);
    },
    getMaxPages: async (categories: Array<number>, alreadyShownIds: Array<any>) => {
        const c = await Article.countDocuments({ category: { $in: categories } });
        return Math.ceil( c / pageSize );
    }
}