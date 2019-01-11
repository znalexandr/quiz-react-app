import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, 
        finishedQuiz: false,
        activeQuistion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 3,
                answers: [
                    {id: 1, text: 'Красного'},
                    {id: 2, text: 'Зеленого'},
                    {id: 3, text: 'Синего'},
                    {id: 4, text: 'Желтого'},
                ]
            },
            {
                id: 2,
                question: 'В каком году основали Саратов?',
                rightAnswerId: 1,
                answers: [
                    {id: 1, text: '1590'},
                    {id: 2, text: '1466'},
                    {id: 3, text: '1750'},
                    {id: 4, text: '1805'},
                ]
            },
            {
                id: 3,
                question: 'Какого цвета небо?',
                rightAnswerId: 3,
                answers: [
                    {id: 1, text: 'Красного'},
                    {id: 2, text: 'Зеленого'},
                    {id: 3, text: 'Синего'},
                    {id: 4, text: 'Желтого'},
                ]
            },
            {
                id: 4,
                question: 'В каком году основали Саратов?',
                rightAnswerId: 1,
                answers: [
                    {id: 1, text: '1590'},
                    {id: 2, text: '1466'},
                    {id: 3, text: '1750'},
                    {id: 4, text: '1805'},
                ]
            },
        ]
    }

    onAnswerClickHandler = (answerId) => {
        
        if(this.state.answerState) {
            return false;
            // const key = Object.keys(this.state.answerState)[0]
            // if(this.state.answerState[key] === 'success') {
            //     return 
            // } 
        }

        const question = this.state.quiz[this.state.activeQuistion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId) {

            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'}
            })

        } else {
            this.setState({
                answerState: {[answerId]: 'error'},
            })

            results[question.id] = 'error'
        }

        const timeout = window.setTimeout(() => {

            if(this.isQuizFinished()) {
                //console.log('Finised')
                this.setState({
                    finishedQuiz: true
                })
            } else {
                
                this.setState({
                    activeQuistion: this.state.activeQuistion + 1,
                    answerState: null
                })
            }
            //console.log(this.state.results)
            window.clearInterval(timeout)
        }, 300)

        

    }
   

    isQuizFinished() {
        return this.state.activeQuistion + 1 === this.state.quiz.length
    }

    retryHandler = () => { 
        this.setState({
            results: {}, 
            finishedQuiz: false,
            activeQuistion: 0,
            answerState: null,
        })
    }

    render() {
        return(
            <div className={'quiz'}>
                <div className={'quiz-wrap'}>
                    {!this.state.finishedQuiz 
                        ? <ActiveQuiz 
                            answers={this.state.quiz[this.state.activeQuistion].answers}
                            question={this.state.quiz[this.state.activeQuistion].question}
                            answerClickHandler={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            activeQuistion={this.state.activeQuistion}
                            state={this.state.answerState}
                        />
                        : <FinishedQuiz 
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                    }
                </div>
            </div>
        );
    }
} 

export default Quiz