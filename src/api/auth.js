import client from "./client"


//userInfo: id, name, email
export const createUser = async (userInfo) =>{
    try {
        const {data} = await client.post('/user/create', userInfo)
        return data
    } catch (error) {
        return {error: error.response.data.error}
    }
    
}

//userInfo: OTP, userid
export const verifyUserEmail = async (userInfo) =>{
    try {
        const {data} = await client.post('/user/verify-email', userInfo)
        return data
    } catch (error) {
        return {error: error.response.data.error}
    }
    
}

export const signInUser = async (userInfo) =>{
    try {
        const {data} = await client.post('/user/sign-in', userInfo)
        return data
    } catch (error) {
        return {error: error.response.data.error}
    }
}

export const getIsAuth = async (token) =>{
    try {
        const {data} = await client.get('/user/is-auth', {
            headers:{
                Authorization: 'Bearer ' + token,
                accept:"application/json",
            }
        })
        return data
    } catch (error) {
        return {error: error.response.data.error}
    }
}

