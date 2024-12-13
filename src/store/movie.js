import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'
const {OMDB_API_KEY} = process.env

export default {
  // module!
  namespaced: true,
  // data!
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed!
  getters: {
    movieIds(state){
      return state.movies.map(m => m.imdbID)
    }
  },
  // methods!
  // 변이
  mutations: { // 여기 안쪽에 있는 함수 불러올때는 commit 씀.
    updateState(state, payload){
      // ['movies','message','loading']
      Object.keys(payload).forEach(key=>{
        state[key] = payload[key] 
      })
    },
    resetMovies(state){
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    } // 뒤로가기하면 초기화되게.
  },
  // 비동기
  // commit 말고 또 dispatch가 있음.
  actions: {
    // 키워드에 해당하는 모든 영화들을 검색하는 메소드
    async searchMovies({state, commit},payload){
      if(state.loading) return // 계속 로딩화면이 뜨는 과부하 상황 방지. 한번 로딩화면 뜨고나면 밑에는 실행안됨.

      commit('updateState',{
        message: '', // 처음에 검색할 때 메세지는 빈값이여야하니까.
        loading: true
      })
      // const {title, type, number, year}= payload
      try{
        const res = await _fetchMovie({
          ...payload,
          page:1
        })
        const { Search, totalResults } = res.data
        commit('updateState',{
          movies: _uniqBy(Search,'imdbID')
          // message: 'Hello',
          // loading: true
        })
        console.log(totalResults); // 325개 => 33페이지
        console.log(typeof totalResults); // string
  
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total/10);
  
        // 추가 요청
        if(pageLength>1){
          for(let page=2; page<=pageLength; page+=1){
            if(page>payload.number/10) break
            const res = await _fetchMovie({
              ...payload,
              // page:page
              page
            })
            const { Search } = res.data
            commit('updateState',{
              movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
            })
          }
        }
      } catch(message){
        commit('updateState',{
          movies : [],
          // message : message
          message
        })
      }
      finally{
        commit('updateState',{
          loading:false
        })
      }
    },
    // ID로 영화 한개만 검색
    async searchMovieWithId({state, commit},payload){
      if(state.loading) return

      commit('updateState',{
        theMovie:{},
        loading:true
      })

      try{
        const res = await _fetchMovie(payload)
        // console.log(res)
        console.log(res.data)
        commit('updateState',{
          theMovie:res.data
        })
      }catch(error){
        commit('updateState',{
          theMovie:{}
        })
      }finally{
        commit('updateState',{
          loading:false
        })
      }
    }
    // sampleAction(context, payload){
    //   // context는 해당 스토어 내에 있는 값들 가져오기
    //   // payload는 외부에서 받아오는 값들
    //   const {state, getters, commit, dispatch} = context
    // }
  }
}

function _fetchMovie(payload){
  const {title, type, year, page, id}= payload
  const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  :`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  return new Promise((resolve, reject)=>{
    axios.get(url)
      .then(res=>{
        console.log(res)
        if(res.data.Error){
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err=>{
        reject(err.message)
      })
  })
}