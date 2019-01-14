import React, {Component} from 'react'
import './QuizList.scss'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/UI/Loader/Loader'

export default class QuizList extends Component {

    state = {
        isQuizesLoad: false,
        quizes: []
    }

    renderQuizes() {
        return this.state.quizes.map(item => {
            return(
                <li key={item.id}>
                    <NavLink to={'/quiz/' + item.id}>
                        {item.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {

        try {
            const response = await axios.get('https://quiz-react-app-4e283.firebaseio.com/quizes.json')
            //console.log(response.data)
            const quizes = []
            Object.keys(response.data).forEach( (key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index+1}`,
                    //quiz: response.data[key]
                })
            }) 

            this.setState({
                quizes,
                isQuizesLoad:true
            })
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={'quiz-list'}>
                <div>
                    {
                    this.state.isQuizesLoad 
                    ?   <>
                            <h1>Список тестов</h1>
                            <ul>
                                {this.renderQuizes()}
                            </ul>
                        </>
                    :   <Loader />
                    }
                    
                </div>
            </div>
        )
    }
}