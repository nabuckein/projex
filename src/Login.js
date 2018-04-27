import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

class Login extends Component {

  handleSubmitButtonClick=(e)=>{
    var firebase = require("firebase");
    var email = document.getElementById("loginEmailInput").value;
    var password = document.getElementById("loginPasswordInput").value;
   // var userID = document.getElementById("loginUserIDInput").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var errorText = document.getElementById("errorMessageText");
      // ...
      console.log("%c" + errorMessage, "background-color: orange");      
      errorText.style.color = 'white';
    });
  }
  handleInputsClick=(e)=>{
    var errorText = document.getElementById("errorMessageText");
    errorText.style.color = 'red';
  }

  render() {
    return (
      <StyleRoot className="LoginStyleRoot" style={styles.LoginStyleRoot}>
        <div className="Login" style={styles.Login}>
          <div className="loginContainer" style={styles.loginContainer}>                 
              <h1 className="loginMainTitle" style={styles.loginMainTitle}>PLEASE LOG IN:</h1>
              <div className="inputsContainer" style={styles.inputsContainer}>
                <input className="loginInput" id="loginEmailInput" style={styles.loginInput} placeholder="Enter your e-mail here" onClick={this.handleInputsClick}></input>
                {/*<input className="loginInput" id="loginUserIDInput" style={styles.loginInput} placeholder="Please enter your User ID"></input>*/}
                <input className="loginInput" id="loginPasswordInput" style={styles.loginInput} placeholder="Enter your password here" onClick={this.handleInputsClick}></input>
              </div>
              <p className="errorMessage" id="errorMessageText" style={styles.errorMessage}> Is your e-mail and password correct? </p>
          </div>
          <div className="loginButtonsContainer" style={styles.loginButtonsContainer}>
            <button className="loginButtonSubmit" key="loginButtonSubmit" style={styles.loginButtonSubmit} onClick={this.handleSubmitButtonClick}>SUBMIT</button>
            <button className="loginButtonCancel" key="loginButtonCancel" style={styles.loginButtonCancel} onClick={this.props.handleCancelLoginClick}>CANCEL</button>
          </div>
          
        </div>
      </StyleRoot>
    );
  }
}


export default Login;

const styles = {
  LoginStyleRoot:{
    height:'100%',
    marginLeft:'auto',
    marginRight:'auto'
  },
  Login:{
    width:'100%',    
  },
  loginContainer:{
    textAlign:'center'
  },
  inputsContainer:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center',
    width:'80%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:60
  },
  loginInput:{
    fontFamily:'Pathway Gothic One',
    width:'100%',
    height:30,
    color:'white',
    textAlign:'center',
    justifyContent:'center',
    backgroundColor:'transparent',
    borderTop:'none',
    borderRight:'none',
    borderLeft:'none',
    borderBottom:'solid white 1px',
    borderRadius:6,
    marginTop:60,
    fontSize:20
  },
  loginMainTitle:{
    fontFamily:'Fjalla One',
    color:'white',
    fontSize:28,
    marginTop:140
  },
  loginButtonsContainer:{
    display:'flex',
    justifyContent:'center',

  },
  loginButtonSubmit:{
    backgroundColor:'white',
    border:'none',
    borderRadius:5,
    paddingLeft:15,
    paddingRight:15,
    fontFamily:'Fjalla One',
    fontSize:30,
    marginLeft:10,
    marginRight:10,
    ':hover':{
      backgroundColor:'limegreen',      
    },
    ':active':{
      backgroundColor:'green',
      color:'white'
    }
  },
  loginButtonCancel:{
    backgroundColor:'white',
    border:'none',
    borderRadius:5,
    paddingLeft:15,
    paddingRight:15,
    fontFamily:'Fjalla One',
    fontSize:30,
    marginLeft:10,
    marginRight:10,
    ':hover':{
      backgroundColor:'yellow',      
    },
    ':active':{
      backgroundColor:'red',
      color:'white'
    },
    
  },
  errorMessage:{
      color:'red',
      fontFamily:'Fjalla One',
      marginBottom:100
    }
}