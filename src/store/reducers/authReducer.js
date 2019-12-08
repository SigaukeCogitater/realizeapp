const initState = {
    loginState: false,
    userID: "",
    userName: ""
}

const authReducer = (state = initState, action) => {
    return {login: state}
}

export default authReducer