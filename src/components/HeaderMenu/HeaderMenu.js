import React from 'react'
import './HeaderMenu.scss' 
import {NavLink} from 'react-router-dom'

const HeaderMenu = props => {

    const links = [
        {
            path: '/',
            text: 'Список тестов',
            exact: true
        },
        {
            path: '/quiz-creator',
            text: 'Создать тест',
            exact: true
        },
    ]

    return(
        <header className="header-menu">
            <ul>
                {links.map((item, index) => {
                    return(
                        <li key={index}>
                            <NavLink to={item.path} exact={item.exact}>{item.text}</NavLink>
                        </li>
                    )
                })}
            </ul>
        </header>
    )
}

export default HeaderMenu