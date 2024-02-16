<template>
  <!-- <h1>Home!</h1>
  <div class="btn btn-primary">
    Home
  </div> -->
  <Headline />
  <Search />
  <MovieList />
</template>
<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components:{
    Headline,
    Search,
    MovieList
  },
  created() {
    this.$store.commit('movie/resetMovies') // 뒤로가기 하면 초기화됨.
  }
}
</script>
