import React from 'react'
import './FinishedQuiz.scss'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'


const FinishedQuiz = props => {

    const successTotal = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)
    

    return (
        <div className="finished-quiz">
            <h2>Результаты</h2>

            <h3>Правильных ответов {successTotal} из {props.quiz.length}</h3>

            <div className="finished-quiz-list">
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        props.results[quizItem.id]
                    ]
                    return (
                        <div className="finished-quiz-list__item" key={quizItem.id}>
                            <strong>{index+1}.&nbsp;</strong>
                            <span>{quizItem.question}</span>
                            <i className={cls.join(' ')}/>
                        </div>
                    )
                })}
            </div>

            <div>
                <Button onClick={props.onRetry} type={'btn_primary'}>Повторить?</Button>
                <div style={{
                    display: 'inline-block',
                    marginLeft: '15px'
                }}>
                    <Link to="/">
                        <Button  type={'btn_success'}>Перейти к списку тестов</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FinishedQuiz;