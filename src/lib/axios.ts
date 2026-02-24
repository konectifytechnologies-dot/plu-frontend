import axios from "axios";

export default axios.create({
    baseURL:'https://api.pludevelopers.co.ke',
    withCredentials:true,
    withXSRFToken:true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});