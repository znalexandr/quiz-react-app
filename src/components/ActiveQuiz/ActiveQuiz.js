import React from 'react'
import './ActiveQuiz.scss'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = (props) => {
    return (
        <>
            <h1>Ответьте на все вопросы</h1>
            <div className="active-quiz">
                <div className="active-quiz__question">
                    <div>
                        <strong>{props.activeQuistion + 1}.</strong>&nbsp;
                        <span>{props.question}</span>
                    </div>
                    <div>
                        {props.activeQuistion + 1} из {props.quizLength}
                    </div>
                </div>
                <div className="active-quiz__answer">
                    <AnswersList 
                        answers={props.answers}
                        answerClickHandler={props.answerClickHandler}
                        state={props.state} />
                </div>
            </div>
        </>
    )
}

export default ActiveQuiz