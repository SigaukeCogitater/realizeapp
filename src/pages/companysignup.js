import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
//MUI Stuff

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


//Jquery

// import $ from 'jquery';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '10px auto 10px auto'
    },
    TextField:{
        margin: '10px auto 10px auto'
    },
    button:{
        color: 'pink',
        marginTop: 20,
        position: 'relative' 
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress:{
        position: 'absolute'
    },
    small:{
        marginTop: 10
    }
    
};

class companysignup extends Component {

    constructor(){
        super();
        this.state={
            email: '',
            password: '',
            loading: false,
            userName: "",
            companyName:"",
            companySite:"",
            phoneNumber:"",
            password: "",
            confirmPassword: "",
            accountType: 1,
            errors:{}
            
        };
    };
    
    handleSubmit = (event) => {
        
        
        event.preventDefault();
        this.setState({
            loading: true
        });
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        
          const userData ={
            "accountType": this.state.accountType,
            "email": this.state.email,
            "password": this.state.password,
            "userName": this.state.userName,
            "companyName": this.state.companyName,
            "companySite": this.state.companySite,
            "phoneNumber": this.state.phoneNumber,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword
        };
          axios.post('/signup/company', userData, axiosConfig)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                console.log(res.data);
                this.state.loading = false;
                // this.setState({token : res.data.token,
                // loading: false});

                this.props.history.push('/');
                console.log("got response");
                console.log(this.state);
            })
            .catch((err) => {
                this.state.errors = err.response.data;
              
                this.state.loading = false;
                console.log("got errors");
                console.log(this.state);

              
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value //this will hold name and value of email or name depending on the event
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return(
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="RealiseApp icon" className={classes.image}/>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Company Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.TextField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        <TextField id="password" 
                            name="password" 
                            type="password" 
                            label="Password"
                            helperText={errors.password}
                            error={errors.password ? true : false} 
                            className={classes.TextField}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        <TextField id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password"
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false} 
                            className={classes.TextField}
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        <TextField id="userName" 
                            name="userName" 
                            type="text" 
                            label="User Name"
                            helperText={errors.userName}
                            error={errors.userName ? true : false} 
                            className={classes.TextField}
                            value={this.state.userName} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        <TextField id="companyName" 
                            name="companyName" 
                            type="text" 
                            label="Company Name"
                            helperText={errors.companyName}
                            error={errors.companyName ? true : false} 
                            className={classes.TextField}
                            value={this.state.companyName} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        <TextField id="companySite" 
                            name="companySite" 
                            type="text" 
                            label="Company Site"
                            helperText={errors.companySite}
                            error={errors.companySite ? true : false} 
                            className={classes.TextField}
                            value={this.state.companySite} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        <TextField id="phoneNumber" 
                            name="phoneNumber" 
                            type="text" 
                            label="Phone Number"
                            helperText={errors.phoneNumber}
                            error={errors.phoneNumber ? true : false} 
                            className={classes.TextField}
                            value={this.state.phoneNumber} 
                            onChange={this.handleChange} 
                            fullWidth/>
                        
                            {errors.general && (
                              <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                              </Typography>
                            )}

                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleSubmit}
                            // disabled={loading}
                            >
                              companysignup
                              {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                              )}
                            </Button>  <br /><br /> 
                            <small className={classes.small}>
                                  have an account ?  sign in <Link to="/signin">here</Link>
                            </small>                         

                    </form>

                </Grid>
                <Grid item sm/>
            </Grid>
        );
    };

};

companysignup.propTypes = {

    classes: PropTypes.object.isRequired

}

export default withStyles(styles)(companysignup);


