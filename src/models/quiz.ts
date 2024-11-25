import mongoose from "mongoose";

const {Schema} = mongoose;

const questionSchema = new mongoose.Schema({
    qid: { type: String },
    category: { type: String},
    question: { type: String},
    options: { type: [String]},
    answer: { type: String},
    explanation: { type: String},
});

// Main Schema
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    day: { type: Number, required: true },
    questions: { type: [questionSchema], required: true },
});

const Quiz = mongoose.model('quizes', quizSchema);

export default {
    getAllQuiz: async () => {
        return Quiz.find({},{__v: 0, _id: 0, "questions._id": 0, "questions.__v": 0});
    }
}