import React, {Component} from 'react'
import './QuizCreator.scss'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

import {createControl, validate, validateForm} from '../../form/formFramework'

import axios from 'axios'

function createOptionControl(num) {
    return createControl({
        label: `Вариант ${num}`,
        errorMessage: 'Поле не может быть пустым',
        id: num,
    }, {required:true})
}

function createFormControl() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        },{required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControl()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault();

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]

        }

        quiz.push(questionItem);

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControl()
        })


        
    }
    createQuizHandler = async event => {
        event.preventDefault()
        //console.log(this.state.quiz)

       /*  axios.post('https://quiz-react-app-4e283.firebaseio.com/quizes.json').then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        }) */

        try {
            await axios.post('https://quiz-react-app-4e283.firebaseio.com/quizes.json', this.state.quiz)
            //console.log(response.data)

            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControl()
            })
        } catch(e) {
            console.log(e)
        }
    }


    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControl() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return(
                <React.Fragment key={controlName + index}>
                    <Input  key={controlName + index}
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={event => this.changeHandler(event.target.value, controlName)} />
                    {index === 0 
                        ? <hr/>
                        : null
                    }
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        //console.log(event.target.value)

        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        return (
            <div className={'quiz-creator'}>
                <div>
                    <h1>Создание теста</h1>

                    <form  onSubmit={this.submitHandler}>
                        {this.renderControl()}

                        <Select 
                            label="Правильный ответ"
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                {text:'1', value: 1},
                                {text:'2', value: 2},
                                {text:'3', value: 3},
                                {text:'4', value: 4},
                            ]}
                        />

                        <Button 
                            type={'btn_primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                            >
                            Добавить вопрос
                        </Button>

                        <Button 
                            type={'btn_success'}
                            onClick={this.createQuizHandler}
                            disabled={!this.state.quiz.length}
                            >
                            Создать тест
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}