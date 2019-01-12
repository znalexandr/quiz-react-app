import React, {Component} from 'react'
import './QuizList.scss'
import {NavLink} from 'react-router-dom'

export default class QuizList extends Component {

    renderQuizes() {
        return [1, 2, 3].map((item, index) => {
            return(
                <li key={index}>
                    <NavLink to={'/quiz/' + item}>
                        Тест {item}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={'quiz-list'}>
                <div>
                    <h1>Список тестов</h1>

                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}