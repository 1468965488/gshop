<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" :class=" sc" v-for="(sc, index) in starClass" :key="index"></span>
  </div>
</template>

<script>

  export default {
    props:{
      score:Number,
      size:Number
    },
    computed:{
      starClass(){
        const {score} = this
        let sc = score
        const scs = []
        for(let i=0;i<5;i++){
          if(sc>=0.5){
            scs.push('on')
          }else if(sc<0.5 && sc>0){
            scs.push('half')
          }else{
            scs.push('off')
          }
          sc-=1
        }
        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')

</style>
