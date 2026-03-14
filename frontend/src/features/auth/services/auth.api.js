import axios from 'axios'

const api = axios.create({
    // baseURL:'https://moodify-r1v4.onrender.com/api',
    baseURL:"http://localhost:4000/api",
    withCredentials:true
})

export const login = async (email,password)=>{
    const responce = await api.post('/auth/login',{
        email,password
    })
    return responce.data;
} 

export const register = async(username,email,password)=>{
  const responce = await api.post('/auth/register',{
        username,
        email,
        password
    })
    return responce.data;
}


export const getMe = async()=>{
    const responce = await api.get('/user');
    return responce.data
}

export const logout = async()=>{
    const responce = await api.post('/auth/logout');
    return responce.data
}