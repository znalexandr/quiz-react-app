import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATOR} from './actionTypes'
import axios from 'axios'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreate() {
    return {
        type: RESET_QUIZ_CREATOR
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('https://quiz-react-app-4e283.firebaseio.com/quizes.json', getState().create.quiz)
        dispatch(resetQuizCreate())
    }
}