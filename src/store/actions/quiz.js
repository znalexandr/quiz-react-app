import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_QUIZ} from './actionTypes'

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

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
           
            dispatch(fetchQuizSuccess(quiz))
        } catch(e) {
            fetchQuizesError(e)
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {

        const state = getState().quiz 

        if(state.answerState) {
            return false;
            // const key = Object.keys(this.state.answerState)[0]
            // if(this.state.answerState[key] === 'success') {
            //     return 
            // } 
        }

        const question = state.quiz[state.activeQuistion];
        const results = state.results;

        if(question.rightAnswerId === answerId) {

            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            // this.setState({
            //     answerState: {[answerId]: 'success'}
            // })

            dispatch(quizSetState({[answerId]: 'success'}, results))

        } else {
            // this.setState({
            //     answerState: {[answerId]: 'error'},
            // })

            results[question.id] = 'error'

            dispatch(quizSetState({[answerId]: 'error'}, results))
        }

        const timeout = window.setTimeout(() => {

            if( isQuizFinished(state) ) {
                //console.log('Finised')
                // this.setState({
                //     finishedQuiz: true
                // })

                dispatch(finishQuiz())
            } else {
                
                // this.setState({
                //     activeQuistion: this.state.activeQuistion + 1,
                //     answerState: null
                // })

                dispatch(quizNextQuestion(state.activeQuistion + 1))

            }
            //console.log(this.state.results)
            window.clearInterval(timeout)
        }, 300)
    }
}


export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}

function isQuizFinished(state) {
    return state.activeQuistion + 1 === state.quiz.length
}