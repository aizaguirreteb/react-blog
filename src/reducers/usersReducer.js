export default (state = [], action ) => {

    switch(action.type) {
        case 'FETCH_USER':
            return [...state, action.payload]
        default:
            return state
    }
}
/**
 * We want to add the new array of users to our app state
 */