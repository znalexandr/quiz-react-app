import React, {Component} from 'react'
import './Auth.scss';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

export default class Auth extends Component {

    formHandler = event => {
        event.preventDefault()
    }


    authHandler = () => {}
    registerHandler = () => {}

    render() {
        return (
            <div class="auth">
                <div>
                    <h1>Авторизация</h1>
                    <form className={'auth-form'} onSubmit={this.formHandler}>
                        <Input
                            label="Email"
                        />
                        <Input
                            label="Пароль"
                            type="password"
                        />

                        <Button type="btn_success" onClick={this.authHandler}>Войти</Button>
                        <Button type="btn_primary" onClick={this.registerHandler}>Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}