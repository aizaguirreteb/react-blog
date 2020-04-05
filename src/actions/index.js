import jsonPlaceholder from "../apis/jsonPlaceholder"

export const fetchPosts = () => async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts')

        dispatch({ 
           type: 'FETCH_POSTS',
           payload: response.data
        })
    }

/**
 * If we just dispatch response then we would be sending the WHOLE response
 * with its headers and status and everything. So we need to specify it to data.
 */

export const fetchUsers = (id) => async( dispatch ) => {
    const response = await jsonPlaceholder.get(`/users/${id}`)

    dispatch({ type: 'FETCH_USER', payload: response.data })
}
    
