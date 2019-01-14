import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
    state = {
        results: {}, 
        finishedQuiz: false,
        activeQuistion: 0,
        answerState: null,
        quiz: [], 
        isLoaderQuiz: false
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

    async componentDidMount() {
        //console.log('Quiz id = ' + this.props.match.params.id)

        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            //console.log(response.data)
            this.setState({
                quiz,
                isLoaderQuiz:true
            })
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        return(
            <div className={'quiz'}>
                <div className={'quiz-wrap'}>
                    {
                        !this.state.isLoaderQuiz 
                        ? <Loader />
                        : !this.state.finishedQuiz 
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