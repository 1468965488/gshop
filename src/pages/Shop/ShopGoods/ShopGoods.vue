<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper ">
        <ul>
          <!--current-->
          <li class="menu-item "  v-for="(good, index) in goods" :key="index"
              :class="{current:index===currentIndex}" @click="clickMenu(index)">
            <span class="text bottom-border-1px">
              <img class="icon"  v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index" >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index2) in good.foods"
                  :key="index2" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'

  export default {
    components:{
      CartControl,
      Food,
      ShopCart
    },
    data(){
      return{
        scrollY:0,
        tops:[],
        food:{}   //需要显示的food
      }
    },
    computed:{
      ...mapState(['goods']),
      currentIndex(){
        //得到相关条件数据 根据条件计算
        const {tops, scrollY} = this
        //根据条件计算得结果，
        const index = tops.findIndex((top, index)=>{
          return scrollY>=top && scrollY<tops[index+1]
        })
        //返回
        return index
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods', ()=>{
        //传过来的函数数据更新之后执行
        this.$nextTick(()=>{ //
          this.initScroll()
          this.initTops()
        })
      })
    },
    methods:{
      //初始化滚动条
      initScroll(){
        const menuScroll = new BScroll('.menu-wrapper',{
          click:true
          //会阻止浏览器默认点击事件
        })
        this.foodsScroll = new BScroll('.foods-wrapper',{
          probeType:2,
          click:true
        })
        this.foodsScroll.on('scroll', ({x, y})=>{
          this.scrollY = -y
        })
        this.foodsScroll.on('scrollEnd', ({x, y})=>{
          this.scrollY = -y
        })
      },
      //手机tops
      initTops(){
        //初始化tops
        const tops = []
        let top = 0
        tops.push(top)
        //收集
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach(li=>{
          top += li.clientHeight
          tops.push(top)
        })
        //更新
        this.tops = tops
      },
      //左侧选项点击监听
      clickMenu(index){
        this.scrollY = this.tops[index]
        // this.currentIndex = index
        this.foodsScroll.scrollTo(0, -this.tops[index], 300)
      },
      //显示food
      showFood(food){
        //更新food
        this.food = food
        //显示food组件
        this.$refs.food.toggleShow()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
