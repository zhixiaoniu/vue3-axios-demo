import axios from 'axios'
import { ElMessage } from "element-plus";

//全局配置
const service = axios.create({
    // baseUrl:'www.vue3demo.com/index.php?s=/',  //根路径
    timeout:8000    //超时时间
})

//相应拦截
service.interceptors.response.use(res=>{
    const { Success,data,Message } = res.data
    //判断是否成功
    if(Success){
        ElMessage.success('成功')
        return data
    }else{
        ElMessage.error(Message)
    }
})

//request 方法
function request(options){
    options.method = options.method || 'get'
    if(options.method.toLowerCase() === 'get') options.params = options.data
    return service(options)
}

['get','post','put','delete'].forEach(item=>{
    request[item] = (url,data) =>{
        // console.log(url)
        return request({
            url,
            data,
            method:item
        })
    }
})

export default request