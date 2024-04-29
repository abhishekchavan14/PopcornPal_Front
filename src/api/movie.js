import client from "./client"

export const uploadTrailer = async (formData, onUploadProgress) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post('/movie/upload-trailer', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
                'content-Type': 'multipart/form-data'
            },
            onUploadProgress: ({ loaded, total }) => {
                if (onUploadProgress) onUploadProgress(Math.floor((loaded / total) * 100))
            }
        })
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}
export const uploadMovie = async (formData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post('/movie/create-movie', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
                'content-Type': 'multipart/form-data'
            }
        })
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}

export const getTopRatedMovies = async (type) => {
    try {
        let endpoint = '/movie/top-rated'
        if(type) endpoint = endpoint + '?type=' + type
        const { data } = await client.get(endpoint)
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}

export const getLatestUploads = async (type) => {
    try {
        const { data } = await client.get('/movie/latest-uploads')
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}
export const getSingleMovie = async (id) => {
    try {
        const { data } = await client.get('/movie/single/' + id)
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}

