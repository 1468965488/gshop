import Vue from 'vue'
import moment from 'moment'
//自定义过滤器

Vue.filter('dateFormat', function(value, formatStr='YYYY-MM-DD HH:mm:ss'){
  return moment(value).format(formatStr)
})

