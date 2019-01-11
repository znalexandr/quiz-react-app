import React from 'react'

const AnswerItem = props => {
    let cls = null;
    if(props.state) {
        cls = props.state
    }
    return(
        <li  
            onClick={() => props.answerClickHandler(props.answer.id)}
            className={cls}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem