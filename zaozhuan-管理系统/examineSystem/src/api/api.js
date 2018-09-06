import axios from 'axios'
// 公共 url
var oUrl = 'http://124.133.15.90:8087/zaozhuang-supervise/';//服务器
// var oUrl = 'http://192.168.103.126:8087/zaozhuang-supervise/';//刘文琪
// var oUrl = 'http://127.0.0.1:8090/zaozhuang-supervise/';//ng
// var oUrl = 'http://192.168.103.125:8087/zaozhuang-supervise/';//王宜华
localStorage.setItem('url',oUrl)
// var img='http://192.168.103.126:8087/zaozhuang-supervise/attachment/fileUpload';
// var img='http://192.168.103.125:8087/zaozhuang-supervise/attachment/fileUpload';
// var img='http://127.0.0.1:8090/zaozhuang-supervise/attachment/fileUpload';/ng
var img='http://124.133.15.90:8087/zaozhuang-supervise/attachment/fileUpload';
export function oUrl(){
  return oUrl;
}
export function uploadImg(){
  return img;
}

export function postAjax(urls,obj) { /*post方法*/
  return getPromise(`${oUrl}${urls}`,obj)
}
export function getAjax(urls,obj) {/*get方法*/
  return getPromiseget(`${oUrl}${urls}`,obj)
}
// 封装 promise
function getPromise(url,obj){
  return new Promise((resolve,reject) => {
      axios.post(url,obj).then(
        (response) =>{
          resolve(response)
        }
      ).catch(
        (err) => {
          reject(console.log(err))
        }
      )
    })
}

function getPromiseget(url,obj){
  return new Promise((resolve,reject) => {
      axios.get(url,{params:obj}).then(
        (response) =>{
          resolve(response)
        }
      ).catch(
        (err) => {
          reject(console.log(err))
        }
      )
    })
}
// axios.interceptors.response.use( 
//   response => {
//     if(response.data.code==401){
      
//       // location.href=response.data.data;
//       this.$router.push({ path:'/login',});
//     }else {

//       return response;
//     }
     
//   },
//   error => {
//       return Promise.reject(error.response.data)
//   });