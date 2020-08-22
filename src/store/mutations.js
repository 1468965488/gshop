/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_SHOPCART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USERINFO] (state, {userinfo}) {
    state.userinfo = userinfo
  },

  [RESET_USER_INFO] (state){
    state.userinfo = {}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if(food.count){
      food.count --
      if(food.count === 0)
      state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
    }
  },

  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if(!food.count){
      //这种添加方式能保证新增的属性也有属性绑定
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    }else{
      food.count ++
    }
  },

  [CLEAR_SHOPCART] (state) {
    //清除food中的计数
    state.cartFoods.forEach(item=>{
      if(item.count){
        item.count = 0
      }
    })
    //置为空数组
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, {shops}) {
    state.searchShops = shops
  },
}
