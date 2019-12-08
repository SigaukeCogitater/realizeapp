const initState = {
    accountType: -1,
    email: "",
    userName: ""
}

const authReducer = (state = initState, action) => {
    return {account: state}
}

export default authReducer