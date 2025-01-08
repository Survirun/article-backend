import mongoose from 'mongoose';

const { Schema } = mongoose;

const article = new Schema({
    category: {
        type: Number,
        required: true
    },
    categories: { //v2
        type: [Number],
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
    },


});

article.index({title: 'text'})

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
        const passedObjectIds = (passedIds.length > 0) ? passedIds.map(id => new mongoose.Types.ObjectId(id)) : [];
        return await Article.aggregate([
            { $match: { category: { $in: categories } } },
            {
                $addFields: {
                    weightAdjusted: {
                        $cond: [
                            { $in: ['$_id', alreadyShownIds] },
                            //{ $subtract: ['$weight', 1000] },
                            0,
                            {
                                $cond: [
                                    { $in: ['$_id', passedObjectIds] },
                                    0,
                                    '$weight',
                                ],
                            },
                        ],
                    },
                },
            },
            { $sort: { weightAdjusted: -1 } },
            { $unset: 'weightAdjusted' },
            { $skip: pageSize * (pageNum - 1) },
            { $limit: pageSize },
        ]);
        //return Article.find({}, { __v: 0 }).limit(30);
    },
    getArticlesV2: async(categories: Array<number>, pageNum: number = 1) => {
        return await Article.aggregate([
            {
                $match: {
                    $or: [
                        { category: { $in: categories } },
                        { categories: {$in: categories }}
                    ]
                }
            },{
                $addFields: {
                  categories: {
                    $cond: {
                      if: { $gt: ["$category", null] },
                      then: ["$category"],
                      else: "$categories"
                    }
                  }
                }
              },
              {
                $project: {
                  category: 0 // category 필드는 제외합니다.
                }
              },
            { $sort: { weight: -1 } },
            { $skip: pageSize * (pageNum - 1) },
            { $limit: pageSize },
        ]);
    },
    getMaxPagesV2: async(categories: Array<number>) => {
        const c = await Article.countDocuments({$or: [
            { category: { $in: categories } },
            { categories: { $in: categories } }
        ]});
        return Math.ceil( c / pageSize );
    },
    getMaxPages: async (categories: Array<number>, alreadyShownIds: Array<any>) => {
        const c = await Article.countDocuments({ category: { $in: categories } });
        return Math.ceil( c / pageSize );
    },
    getMaxPagesForSearchKeywords: async ( searchKeyword: string, pageSizeByAPI: number = 10) => {
        const c = await Article.countDocuments(
            {$text: {$search: searchKeyword}}
        );
        return Math.ceil( c / pageSizeByAPI );
    },
    getArticlesBySearchKeywords: async (page: number, searchKeyword: string, pageSizeByAPI: number = 10) => {
        return Article.aggregate([
            {$match: {$text: {$search: searchKeyword}}},
            {
                $addFields: {
                    categories: {
                        $cond: {
                            if: { $gt: ["$category", null] },
                            then: ["$category"],
                            else: "$categories"
                        }
                    },
                    score: {
                        $meta: 'textScore'
                    }
                }
            },
            {
                $sort: {
                    score: -1
                },
            },
            {
                $project: {
                    score: 0,
                    category: 0,
                }
            },
            { $skip: pageSizeByAPI * (page - 1) },
            { $limit: pageSizeByAPI },
        ]);
    }
}
