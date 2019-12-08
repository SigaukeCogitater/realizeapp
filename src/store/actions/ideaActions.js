export const createIdea = (idea) =>{
    return (dispatch, getState) => {
        dispatch({ type: 'ADD_Idea', idea: idea})
    }
}