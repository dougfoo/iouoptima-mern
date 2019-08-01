
export const API_URL = 'http://localhost:8000';

export const getTokens = function () {
    // return difference between start and end
    const a = localStorage.getItem('accesstoken')
    const b = localStorage.getItem('refreshtoken')
    const c = localStorage.getItem('username')
    const d = localStorage.getItem('userid')  
    const e = localStorage.getItem('activeUser')  
    return {accesstoken: a, refreshtoken: b, username: c, userid: d, activeUser: e};
  }

