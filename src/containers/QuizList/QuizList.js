import React, {Component} from 'react'
import './QuizList.scss'
import {NavLink} from 'react-router-dom'
//import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'


class QuizList extends Component {

    

    renderQuizes() {
        return this.props.quizes.map(item => {
            return(
                <li key={item.id}>
                    <NavLink to={'/quiz/' + item.id}>
                        {item.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={'quiz-list'}>
                <div>
                    {
                    this.props.loading && this.props.quizes.length !== 0
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

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)