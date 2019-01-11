import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
    return(
        <ul>
            {props.answers.map((answer, i) => {
                return(<AnswerItem 
                    key={answer.id}
                    answer={answer}
                    answerClickHandler={props.answerClickHandler}
                    state={props.state ? props.state[answer.id] : null}
                />)
            })}
        </ul>
    )
}

export default AnswersList