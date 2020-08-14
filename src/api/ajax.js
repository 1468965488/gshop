/*
ajax请求模块
返回值：promise 对象
异步返回的数据是response.data
*/
import axios from 'axios'
export default function ajax(url, data={}, type="GET") {
  return new promise(function (resolve, reject) {
    //执行异步ajax请求
    let promise
    if(type === 'GET'){
      let dataStr = ''
      Object.keys(data).forEach(key=>{
        dataStr += key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    }else{
      type = type.toUpperCase()
      promise = axios.post(url, data)
    }

    //成功则调用resolve,失败则调用reject
    promise.then(response=>{
      resolve(response.data)
    }).catch(error=>{
      reject(error)
    })

  })

}




