import { createStore } from "vuex"; // store를 생성해줄 수 있는 함수
import movie from './movie'
import about from './about'

export default createStore({
  modules:{
    movie,
    about
  }
})