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
        marginTop: 20 
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

class signin extends Component {

    constructor(){
        super();
        this.state={
            email: '',
            password: '',
            loading: false,
            errors:{}
            
        };
    };

    handleSubmit = (event) => {
        
        console.log("submitted");
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
            
            "email": this.state.email,
            "password": this.state.password
        };
          axios.post('/login', userData, axiosConfig)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({token : res.data.token,
                loading: false});

                this.props.history.push('/');
                console.log(this.state);
            })
            .catch((err) => {
                this.state.errors = err.response.data;
                //this.state.errors.password = err.response.data.errors.password;
                //this.state.errors.email = err.response.data.errors.email;
                this.state.loading = false;
                console.log(this.state.errors);

                // this.setState({
                //     errors: err.response.data,
                //     loading: false
                // });
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
                        Sign In
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
                              Signin
                              {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                              )}
                            </Button>  <br /><br /> 
                            <small className={classes.small}>
                                  dont have an account ? <br /> 
                                  sign up a <Link to="/companysignup">company account</Link>
                                  <br />
                                  sign up a <Link to="/personalsignup">Personal account</Link>
                            </small>                         

                    </form>

                </Grid>
                <Grid item sm/>
            </Grid>
        );
    };

};

signin.propTypes = {

    classes: PropTypes.object.isRequired

}

export default withStyles(styles)(signin);
