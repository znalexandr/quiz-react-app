import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR} from '../actions/actionTypes'

const initialState = {
    quizes: [],
    isQuizesLoad: false,
    error: null
}

export default function quizReducer(state = initialState, action) {
    
    switch(action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, isQuizesLoad: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, 
                isQuizesLoad:true,
                quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                isQuizesLoad: false,
                error: action.error
            }
        default:
            return state
    }
}