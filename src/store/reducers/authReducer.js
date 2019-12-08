const initState = {
    accountType: -1,
    userID: "",
    userName: ""
}

const authReducer = (state = initState, action) => {
    return {account: state}
}

export default authReducer