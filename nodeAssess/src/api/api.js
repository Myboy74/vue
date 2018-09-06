import axios from 'axios'
// 公共 url
var oUrl = 'http://124.133.15.90:8087/oa-zaozhuang/';
var img='http://124.133.15.90:8087/oa-zaozhuang/oa_attachment/upload_attachment';
// var oUrl='http://192.168.101.129:8087/oa-zaozhuang/';
// var img='http://192.168.101.129:8087/oa-zaozhuang/oa_attachment/upload_attachment';
// var tupian = 'http://dangqun.demo.fosung.com/dq/common/upload/image';
// var xc = 'http://dangqun.demo.fosung.com';
export function oUrl(){
  return oUrl;
}
export function uploadImg(){
  return img;
}
// http request 请求拦截器，有token值则配置上token值
// axios.interceptors.request.use(
//     config => {
//     	// console.log(config);
// //      if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
// //          config.headers.Authorization = token;
// //      }
// 			if(config.data){
// 				if(sessionStorage.getItem('uid')){
//         	var userId={
//         		userId:sessionStorage.getItem('uid')
//         	};
//         	config.data= Object.assign({},config.data,userId);
//         }
// 			}else{
// 				if(sessionStorage.getItem('uid')){
//         	var userId={
//         		userId:sessionStorage.getItem('uid')
//         	}
//         	config.params= Object.assign({},config.params,userId);
//         }else{
//           // window.location.href='#/';
//         }
// 			}
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });
//
// // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 这里写清除token的代码
//                     // router.replace({
//                     //     path: 'login',
//                         // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//                     // })
//             }
//         }
//         return Promise.reject(error.response.data)
//     });

export function postA(urls,obj) { /*post方法*/
  return getPromise(`${oUrl}${urls}`,obj)
}
export function getA(urls,obj) {/*get方法*/
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
