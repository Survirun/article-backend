import { getFirestore, Filter } from 'firebase-admin/firestore';

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
}

export default {
    getArticle: async(keywords: Array<string>) => {
        let result: Article[] = []
        for(const keyword of keywords) {
            const rawData = await getFirestore().collection(keyword).limit(30).get()
            const data = rawData.docs.map(doc => doc.data() as Article)
            result = [...result, ...data]       
        }
        return result
    }
}