<template>
  <div id="app">
    <router-view/>
    <FootGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FootGuide from './components/FootGuide/FootGuide'
  export default {
    components:{
      FootGuide
    },
    methods:{
      ...mapActions(['getAddress', 'getUserInfo'])
    },
    mounted () {
      this.getAddress()
      this.getUserInfo()
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
