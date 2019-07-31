import decode from 'jwt-decode';
import axios from 'axios';
import * as MyConsts from '../configs';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:8000' // API server domain
    }

    login(username, password) {
        // Get a token from api server using the fetch api
        axios.post(this.domain + '/api/token/', 
              {username: values.username, password: values.password}, 
              {headers: {"Content-Type": "application/json"}})
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({ accesstoken: data.access, refreshtoken: data.refresh, isAuthenticated: true });                
                message.info("Logged in");
                localStorage.setItem('accesstoken',data.access)
                localStorage.setItem('refreshtoken',data.refresh)
                localStorage.setItem('username',values.username)
                localStorage.setItem('userid',2)
                this.setToken(data) // Setting the token in localStorage
            })
            .catch(function (error) {
                message.error("Axios backend active user error: "+error);
            })

        return true;
    }

    loggedIn() {
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    // @TODO how to do this ??
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
}
