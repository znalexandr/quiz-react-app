import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')
            //console.log(response.data)
            const quizes = []
            Object.keys(response.data).forEach( (key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index+1}`,
                    //quiz: response.data[key]
                })
            }) 

            dispatch(fetchQuizesSuccess(quizes))
            
            /* this.setState({
                quizes,
                isQuizesLoad:true
            }) */
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}
export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}