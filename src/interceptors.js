import axios from "axios";
import store from '@/store'
import messageOnce1 from './utils/messageOnce1';
let messageOnce = new messageOnce1()
axios.interceptors.request.use(function(config) {
    store.dispatch("changeLoadingStatus", true);
    if (localStorage.getItem("token")) {
        config.headers['token'] = localStorage.getItem('token')
    }
    return config;
}, function(error) {
    store.dispatch("changeLoadingStatus", false);
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
    if(response.data.code==-4 || response.data.code==-2){
        store.commit("setToken");
        messageOnce.error({
            type:'error',
            message:response.data.msg
        })
    }
    if (response.status === 200) {
        store.dispatch("changeLoadingStatus", false);
    }
    return response;
}, function(error) {
    store.dispatch("changeLoadingStatus", false);
    return Promise.reject(error);
});
export default axios
