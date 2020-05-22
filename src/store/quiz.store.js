import { quizService } from '@/services/quiz.service';

export const quizStore = {
    state: {
        quizzes: [],
        quiz: quizService.getEmpty(),
        subjects: []
    },
    getters: {
        quizzes(state) {
            return state.quizzes;
        },
        quiz(state) {
            return state.quiz;
        },
        subjects(state) {
            return state.subjects;
        }
    },
    mutations: {
        setQuizzes(state, { quizzes }) {
            state.quizzes = quizzes;
        },
        setQuiz(state, { quiz }) {                        
            state.quiz = quiz;
        },
        setSubjects(state) {
            state.subjects = state.quizzes.reduce((acc, quiz) => { 
                quiz.subjects.forEach(subject => {
                    if (!acc.includes(subject)) acc.push(subject);
                });
                return acc;
            }, []);
        },
        addQuiz(state, { quiz }) {
            state.quizzes.push(quiz);
        },
        editQuiz(state, { quiz }) {
            const idx = state.quizzes.findIndex(currQuiz => currQuiz._id === quiz._id);
            state.quizzes.splice(idx, 1, quiz);
        },
        removeQuiz(state, { id }) {
            const idx = state.quizzes.findIndex(quiz => quiz._id === id);
            state.quizzes.splice(idx, 1);
        },
        resetCurrQuiz(state) {
            state.quiz = quizService.getEmpty();
        }
    },
    actions: {
        async loadQuizzes(context, { filterBy }) {
            context.commit({ type: 'setIsProcessing', isProcessing: true });
            const quizzes = await quizService.query(filterBy);
            context.commit({ type: 'setQuizzes', quizzes });
            context.commit({ type: 'setIsProcessing', isProcessing: false });
        },
        async loadQuiz(context, { id }) {      
            context.commit({ type: 'setIsProcessing', isProcessing: true });
            const quiz = await quizService.getById(id); 
            if (quiz) context.commit({ type: 'setQuiz', quiz });
            context.commit({ type: 'setIsProcessing', isProcessing: false });
        },
        async saveQuiz(context, { quiz }) {
            context.commit({ type: 'setIsProcessing', isProcessing: true });
            const isEdit = !!quiz._id;                
            const savedQuiz = await quizService.save(quiz);
            context.commit({ type: (isEdit) ? 'editQuiz' : 'addQuiz', quiz: savedQuiz });
            context.commit({ type: 'setIsProcessing', isProcessing: false });
            return savedQuiz;
        },
        async removeQuiz(context, { id }) {
            await quizService.remove(id);
            context.commit({ type: 'removeQuiz', id });
        }
    }
}