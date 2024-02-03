import { getFirestore, Filter, FieldPath } from 'firebase-admin/firestore';

interface Article {
    title: string;
    link: string;
    sitename: string;
    displayLink: string;
    keywords: Array<string>;
    thumbnail: string;
    date: string;
    snippet: string;
    cx: number;
    category: number;
}

export default {
    getArticle: async(keywords: Array<number>) => {
        const rawData = await getFirestore().collection("web").where("category", 'in', keywords).where("cx","==",0).limit(30).get()
        const data = rawData.docs.map(doc => doc.data() as Article)
        return data
    },
    getArticlesByDocId: async (articleIds: Array<string>) => {
        const rawData = await getFirestore().collection("web").where(FieldPath.documentId(), 'in', articleIds).where("cx","==",0).get()
        const data = rawData.docs.map(doc => doc.data() as Article)
        return data
    }
}
