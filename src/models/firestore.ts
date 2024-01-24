import { getFirestore, Filter } from 'firebase-admin/firestore';

export default {
    getArticle: async(keywords: Array<string>) => {
        const result = await getFirestore().collection("web").where('keywords', 'array-contains-any', keywords).limit(30).get()
        if(result.empty) {
            return []
        } else {
            let arr: any[] = [];
            for(const value of result.docs) {
                arr.push(value.data())
            } 
            return arr;
        }
        
    }
}