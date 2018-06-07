import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import 'firebase/firestore';
//import * as firebase from "firebase";

const firebase = require("firebase");

class Signup extends Component {
  
  handleSubmitButtonClick=(e)=>{
    var firstNameInput = document.getElementById('signupFirstNameInput');
    var lastNameInput = document.getElementById('signupLastNameInput');
    var emailInput = document.getElementById('signupEmailInput');
    var passwordInput = document.getElementById('signupPasswordInput');
    var titleSelect = document.getElementById('signupTitleSelect');
    //var userIdInput = document.getElementById('signupUserIDInput');
    var displayName = firstNameInput.value + " " + lastNameInput.value;
    var usersData = {
      firstName:firstNameInput.value,
      lastName:lastNameInput.value,
      fullName:displayName,
      email:emailInput.value,
      displayName: displayName,
      projects:[],
      settings:{
        projectPriority:false
      }

       //This will only be created in the database side, not on the Authentication side of Firebase
      //userID:userIdInput.value,
      //userTitle:titleSelect.value
    }
    var db = firebase.firestore();
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function(user){
      user.updateProfile({
        firstName:firstNameInput.value,
        lastName:lastNameInput.value,
        fullName:displayName,
        displayName: displayName
      });
      db.collection('users').doc(displayName).set(usersData);
      
    },function(error){
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     var errorText = document.getElementById("errorMessageText");
     console.log("%c" + errorMessage, "background-color: red");      
     errorText.style.color = 'white';
     // ...
    }); 
  }
  handleInputsClick=(e)=>{
    var errorText = document.getElementById("errorMessageText");
    errorText.style.color = 'red';
  }

  render() {
    return (
      <StyleRoot style={styles.LoginStyleRoot}>
        <div className="Login" style={styles.Signup}>
          <div className="signupContainer" style={styles.inputsContainer}>                 
              <h1 className="signupMainTitle" style={styles.signupMainTitle}>Please sign up:</h1>
              <input id="signupFirstNameInput" style={styles.signupInput} placeholder="Enter your first name here (required)" onClick={this.handleInputsClick}></input>
              <input id="signupLastNameInput" style={styles.signupInput} placeholder="Enter your last name here (required)" onClick={this.handleInputsClick}></input>
              <input id="signupEmailInput" style={styles.signupInput} placeholder="Enter your e-mail here (required)" onClick={this.handleInputsClick}></input>
              <input id="signupPasswordInput" style={styles.signupInput} placeholder="Enter your password here (required)" type="password"></input>
              {/*<label style={styles.signupSelectLabel}>Select your title:</label>
              <select id="signupTitleSelect" placeholder="Select Your Title" style={styles.signupStatusSelect}>
                <option value="Project Lead" style={styles.projectStatusOption}>Project Lead</option>
                <option value="Controls Engineer" style={styles.projectStatusOption}>Controls Engineer</option>
                <option value="Electrical Designer" style={styles.projectStatusOption}>Electrical Designer</option>
                <option value="Mechanical Engineer" style={styles.projectStatusOption}>Mechanical Engineer</option>
                <option value="Mechanical Designer" style={styles.projectStatusOption}>Mechanical Designer</option>
                <option value="Electrical Technician" style={styles.projectStatusOption}>Electrical Technician</option>
                <option value="Mechanical Technician" style={styles.projectStatusOption}>Mechanical Technician</option>
                <option value="Documentation Specialist" style={styles.projectStatusOption}>Documentation Specialist</option>
                <option value="Manager" style={styles.projectStatusOption}>Manager</option>
              </select>*/}
          {/*<input id="signupUserIDInput" style={styles.signupInput} placeholder="Enter your user ID here (optional)" ></input>*/}
            <p className="errorMessage" id="errorMessageText" style={styles.errorMessage}> Is your e-mail and password correct? </p>

          </div>
          <div className="signupButtonContainer" style={styles.signupButtonContainer}>
            <button className="signupButtonSubmit" key="signupButtonSubmit" style={styles.signupButtonSubmit} onClick={this.handleSubmitButtonClick}>SUBMIT</button>
            <button className="signupButtonCancel" key="signupButtonCancel" style={styles.signupButtonCancel} onClick={this.props.handleCancelSignupClick}>CANCEL</button>
          </div>
        </div>
      </StyleRoot>
    );
  }
}


export default Signup;

const styles = {
  LoginStyleRoot:{
    marginLeft:'auto',
    marginRight:'auto'
  },
  Signup:{
    width:'100%'
  },
  signupContainer:{
    textAlign:'center'
  },
  inputsContainer:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'center',
    width:'40%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:50
  },
  signupInput:{
    fontFamily:'Pathway Gothic One',
    backgroundColor:'transparent',
    width:'100%',
    height:30,
    color:'white',
    textAlign:'center',
    justifyContent:'center',
    borderTop:'none',
    borderRight:'none',
    borderLeft:'none',
    borderBottom:'solid white 1px',
    borderRadius:6,
    marginTop:40,
    fontSize:20
  },
	signupSelectLabel:{
		fontFamily:'Pathway Gothic One',
		color:'white',
		fontSize:22,
		marginTop:80,
		marginRight:10,
		width:'40%',
    textAlign:'right',
	},
	signupStatusSelect:{
		width:'80%',
		marginTop:20,
		fontFamily:'Pathway Gothic One',
		fontSize:20,
    marginBottom:20,		
	},
	projectStatusOption:{
		fontFamily:'Pathway Gothic One',
		backgroundColor:'white'
	},
  signupMainTitle:{
    fontFamily:'Fjalla One',
    color:'white',
    fontSize:28,
    marginTop:80
  },
  errorMessage:{
      color:'red',
      fontFamily:'Fjalla One',
      marginTop:50,
      marginBottom:30
  },
  signupButtonContainer:{
    display:'flex',
    justifyContent:'center',
  },
  signupButtonSubmit:{
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
  signupButtonCancel:{
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
    
  }
}