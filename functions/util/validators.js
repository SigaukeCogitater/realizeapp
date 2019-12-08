const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) {
      return true;
    }else return false;
  }
  
const isEmpty = (string) => {
    if(string.trim() === ''){
      return true;
    }else{ return false;}
  }

exports.validateSignupData = (userData) => {
    let errors = {};
//email validation

    if(isEmpty(userData.email)){
      errors.email = "Email must not be empty";
    }else if(!isEmail(userData.email)){
      errors.email = "must be a valid email address";
    }
    /*userData.forEach(key){

    };*/
    // consider using foreach
    if(isEmpty(userData.password)){
      errors.password = "must not be empty"
    }
    if(isEmpty(userData.userName)){
      errors.userName = "must not be empty"
    }
    
    if(isEmpty(userData.confirmPassword)){
      errors.confirmPassword = "must not be empty"
    }
    
    if(userData.password !== userData.confirmPassword) {
      errors.confirmPassword = "password must match";
    }
    if(userData.accountType === 0){

        if(isEmpty(userData.firstName)){
            errors.firstName = "must not be empty"
          }
          if(isEmpty(userData.lastName)){
            errors.lastName = "must not be empty"
          }

    }else if (userData.accountType === 1){
        
        if(isEmpty(userData.phoneNumber)){
            errors.phoneNumber = "must not be empty"
          }                                                                                                                                                                                                                                         
          if(isEmpty(userData.companySite)){
            errors.companySite = "must not be empty"
          }
          if(isEmpty(userData.companyName)){
            errors.companyName = "must not be empty"
          }
    }


    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}

exports.validateLoginData = (userData) => {
    let errors = {};

    if(isEmpty(userData.email)) errors.email = "Must not be empty";
    if(isEmpty(userData.password)) errors.password = "Must not be empty";
  
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.reduceUserInfo = (userData, user) => {

  let userInfo = {};
  if(user.accountType === 1){
    if(isEmpty(userData.phoneNumber.trim())){
      userInfo.phoneNumber = userData.phoneNumber;
    }
    if(isEmpty(userData.companySite.trim())){
      if(userData.companySite.trim().subsstring(0, 4) !== 'http'){
        userInfo.companySite = `http://${userData.companySite.trim()}`;
      }else{
        userInfo.companySite = userData.companySite;
    
      }
     
    }
    if(isEmpty(userData.companyName.trim())){

      userInfo.companyName = userData.companyName;
    }
  }else{
    if(isEmpty(userData.firstName.trim())){
      userInfo.firstName = userData.firstName;
    }
    if(isEmpty(userData.lastName.trim())){
      userInfo.lastName = userData.lastName;
    }

  }
  return userInfo;
} 