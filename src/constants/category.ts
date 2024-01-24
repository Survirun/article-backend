const commonKeyword = {
    "IT기기": [
        "삼성 갤럭시",
        "갤 24",
        "갤럭시",
        "갤럭시 워치",
        "갤럭시 링",
        "비전 프로",
        "아이폰",
        "에어팟",
        "아이패드",
        "맥북",
        "M3"
    ],
    "개발": [
        "CI/CD",
        "깃허브",
        "구글",
        "Android Studio",
        "Compose",
        "안드로이드 13",
        "코틀린",
        "자바",
        "안드로이드",
        "Google Play",
        "서버리스",
        "백엔드",
        "웹",
        "웹 3.0",
        "프론트 엔드",
        "GPT",
        "생산형 AI",
        "뤼튼",
        "딥러닝",
        "머신러닝",
        "대화형 AI",
        "오픈 AI"
    ],
    "디자인": [
        "유저",
        "사용정",
        "UI"
    ],
    "기획": [
        "유저",
        "PM",
        "PO"
    ]
}

const blogKeyword = {

}

type keyType = 'IT기기' | '개발' | "디자인" | "기획";
type Keys = {
    [key in keyType]: Array<string>
}


export default {
    getSKeyword: (major: string) => {
        if(commonKeyword.hasOwnProperty(major)) {
            const m = major as keyType
            return commonKeyword[m]
        }
        return []
    }
}