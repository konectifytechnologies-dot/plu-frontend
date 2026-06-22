import axios from "axios";


export default axios.create({
    baseURL:'https://developers.disqav.com',
    timeout:60000,
    withCredentials:true,
    withXSRFToken:true,
    xsrfCookieName:'XSRF-TOKEN',
    xsrfHeaderName:'X-XSRF-TOKEN',
    headers:{
        Accept:'application/json'
    }
    
});
axios.interceptors.response.use(null, (err)=> {
    console.log(err) 
})