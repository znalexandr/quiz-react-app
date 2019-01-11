import React from 'react'
import './HeaderMenu.scss' 

const HeaderMenu = props => {

    const links = [
        {
            path: '/',
            text: 'Главная'
        },
        {
            path: '/auth',
            text: 'Авторизация'
        },
        {
            path: '/about',
            text: 'О нас'
        },
    ]

    return(
        <header className="header-menu">
            <ul>
                {links.map((item, index) => {
                    return(
                        <li key={index}>
                            <a href={item.path}>{item.text}</a>
                        </li>
                    )
                })}
            </ul>
        </header>
    )
}

export default HeaderMenu