import React, {Component} from 'react'
import './Auth.scss';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Is from 'is_js'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    formHandler = event => {
        event.preventDefault()
    }


    authHandler = () => {}
    registerHandler = () => {}

    validateControl(value, validation) {

        if(!validation) {
            return true
        }

        let isValid = true;

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email){
            isValid = Is.email(value) && isValid
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;

    }

    onChageHandler = (event, controlName) => {
        //console.log(`${controlName} ${event.target.value}`)

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]} 

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls,
            isFormValid            
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return <Input
                        key={controlName+index} 
                        type={control.type}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={!!control.validation}
                        onChange={event => this.onChageHandler(event, controlName)}
                    />
        })
    }

    render() {
        return (
            <div className="auth">
                <div>
                    <h1>Авторизация</h1>
                    <form className={'auth-form'} onSubmit={this.formHandler}>
                        {this.renderInputs()}

                        <Button 
                            type="btn_success" 
                            disabled={!this.state.isFormValid}
                            onClick={this.authHandler}>Войти</Button>
                        <Button 
                            type="btn_primary" 
                            disabled={!this.state.isFormValid}
                            onClick={this.registerHandler}>Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}