import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

import Loader from '../../components/UI/Loader/Loader'

import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {
    
    componentDidMount() {
        //console.log('Quiz id = ' + this.props.match.params.id)
        //this.props.match.params.id
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return(
            <div className={'quiz'}>
                <div className={'quiz-wrap'}>
                    {
                        !this.props.loading || !this.props.quiz
                        ? <Loader />
                        : !this.props.finishedQuiz 
                            ? <ActiveQuiz  
                                answers={this.props.quiz[this.props.activeQuistion].answers}
                                question={this.props.quiz[this.props.activeQuistion].question}
                                answerClickHandler={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                activeQuistion={this.props.activeQuistion}
                                state={this.props.answerState}
                            />
                            : <FinishedQuiz 
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                    }
                    
                </div>
            </div>
        );
    }
} 

function mapStateToProps(state) {
    return {
        results: state.quiz.results, 
        finishedQuiz: state.quiz.finishedQuiz,
        activeQuistion: state.quiz.activeQuistion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)