import { httpService } from './http.service';

export const quizService = {
    query,
    getById,
    save,
    remove,
    getEmpty,
    getEmptyCriteria
}

function query(criteria) {
    const params = new URLSearchParams(criteria);
    return httpService.get(`quiz?${params}`);
}

function getById(id) {
    return httpService.get(`quiz/${id}`);
}

async function save(quiz) {
    let prm;
    prm = (quiz._id) ? httpService.put(`quiz/${quiz._id}`, quiz) : httpService.post('quiz', quiz);
    return await prm;
}

function remove(id) {
    return httpService.delete(`quiz/${id}`);
}

function getEmpty() {
    return {
        title: '',
        description: '',
        subjects: [],
        questions: []
    }
}

function getEmptyCriteria() {
    return {
        title: '',
        subject: '',
        sortBy: '',
        isDesc: false
    }
}