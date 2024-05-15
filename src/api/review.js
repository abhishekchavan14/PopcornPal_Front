// localStorage.getItem('auth-token')
import client from "./client"

export const addReview = async (movieId, reviewData) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.post(`/review/add/${movieId}`, reviewData, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data
    } catch (error) {
        return error
    }
}

export const getReviewsByMovie = async (movieId) => {
    try {
        const { data } = await client.get(`/review/get-reviews-by-movie/${movieId}`)
        return data
    } catch (error) {
        return error
    }
}
// export const getReviewsByOwner = async (userId) => {
//     try {
//         const { data } = await client.get(`/review/get-reviews-by-owner/${userId}`)
//         return data
//     } catch (error) {
//         return error
//     }
// }

export const addUpvote = async (movieId, reviewID, ownerID) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.post(`/review/add-upvote/${movieId}/${reviewID}`, { ownerID }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data
    } catch (error) {
        return error
    }
}
export const addDownvote = async (movieId, reviewID, ownerID) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.post(`/review/add-downvote/${movieId}/${reviewID}`, { ownerID }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data
    } catch (error) {
        return error
    }
}

export const updateReview = async (reviewID, content) => {
    console.log("API", content)
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.patch(`/review/update/${reviewID}`, { content }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data
    } catch (error) {
        console.log("ERROR>>>", error)
        return error
    }
}

export const removeReview = async (reviewID) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.delete(`/review/delete/${reviewID}`, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data
    } catch (error) {
        return error
    }
}