export const authenticate = (account) =>{
    return (dispatch, getState) => {
        dispatch({ type: 'LOG_IN', account })
    }
}