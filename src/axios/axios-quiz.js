import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-react-app-4e283.firebaseio.com/'
})