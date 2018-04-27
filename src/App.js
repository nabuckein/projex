import React, { Component } from 'react';
import logo from './logo.svg';
import ProjectCard from './ProjectCard.js';
import Login from './Login.js';
import Signup from './Signup.js';
import LoginOrSignup from './LoginOrSignup.js'
import Sidebar from './Sidebar.js';
import AddProjectCard from './AddProjectCard.js';
import NewProjectCardInfo from './NewProjectCardInfo.js';
import * as firebase from "firebase";


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      componentToDisplay:"LoginOrSignup",
      projects:[]
    }
  }

  componentWillMount=(e)=>{
    var config = {
      apiKey: "AIzaSyBXMeHoR1iDD4akXK_k5NzAFhqU9p-Wd7Q",
      authDomain: "projexboard.firebaseapp.com",
      databaseURL: "https://projexboard.firebaseio.com",
      projectId: "projexboard",
      storageBucket: "",
      messagingSenderId: "273809119251"
      };
      firebase.initializeApp(config);
      const firestore = firebase.firestore(); //NEED THESE 3 LINES BEFORE ANY CLOUD FIRESTORE CALLS (NEW RULES FROM FIREBASE 04/21/18)
      const settings = {/* your settings... */ timestampsInSnapshots: true};
      firestore.settings(settings);
      this.firebaseUserSignedInFunction();
  }
  getProjectsFromFirebase=(e)=>{
    var t = this;
    var db = firebase.firestore();
    var projArr = [];
    var projectsInFirebase = db.collection('projects').get().then((snapshot)=>{
      snapshot.forEach((doc)=>{
        projArr.push(doc.data());
      });
      this.setState({projects:projArr})
    })
    
    
  }

  firebaseUserSignedInFunction=(e)=>{
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        console.log("%cCURRENT USER'S E-MAIL: " + user.email, "background: blue; color:white");
        console.log("%cCURRENT USER'S DISPLAY NAME: " + user.displayName, "background: orange; color:black");        
        this.setState({currentUser:user, componentToDisplay: "Projects"});
      } 
      else {
        // No user is signed in.
        console.log("%cNO USER SIGNED IN" , "background: blue; color:white");
        this.setState({currentUser:null, componentToDisplay: "LoginOrSignup"});
      }
    });
  }
  handleCancelLoginClick=(e)=>{
    this.setState({componentToDisplay:"LoginOrSignup"});
  }
  handleCancelSignupClick=(e)=>{
    this.setState({componentToDisplay:"LoginOrSignup"});
  }
  handleCancelNewProjectClick=(e)=>{
    this.setState({componentToDisplay:"Projects"});    
  }
  toLogin=(e)=>{
    this.setState({componentToDisplay:"Login"});
  }
  toSignup=(e)=>{
    this.setState({componentToDisplay:"Signup"});
  }
  toNewProjectCardInfo=(e)=>{
    this.setState({componentToDisplay:"NewProject"});
  }

  render() {
    this.getProjectsFromFirebase();
    if(this.state.componentToDisplay==="Signup" && this.state.currentUser===null){
      return (
        <div className="App" style={styles.App}>
          <Signup handleCancelSignupClick={this.handleCancelSignupClick}/> 
        </div>
      );
    }
    else if(this.state.componentToDisplay==="Login" && this.state.currentUser===null){
      return (
        <div className="App" style={styles.App}>
          <Login handleCancelLoginClick={this.handleCancelLoginClick}/>
        </div>
      );
    }
    else if(this.state.componentToDisplay==="Projects" && this.state.currentUser!==null){
      return (
        <div className="App" style={styles.App}>
          <div style={styles.projectCardDiv}>
            <ProjectCard/>
          </div>
          <div style={styles.addProjectCardDiv}>
            <AddProjectCard toNewProjectCardInfo={this.toNewProjectCardInfo}/>
          </div>

          <div style={styles.sidebarDiv}>
            <Sidebar/> 
          </div>

        </div>
      );
    }
    else if(this.state.componentToDisplay==="NewProject" || this.state.currentUser!==null){
      return <NewProjectCardInfo handleCancelNewProjectClick={this.handleCancelNewProjectClick}/>
      } 
    
    else if(this.state.componentToDisplay==="LoginOrSignup" || this.state.currentUser===null){
        return <LoginOrSignup toLogin={this.toLogin} toSignup={this.toSignup}/>
      } 
    }
    
  
}

export default App;

const styles={
  App:{
    display:'flex',
    flexWrap:'wrap',
    height:'100%'
  },
  projectCardDiv:{
    width:'80%',
    height:'100%'
  },
  addProjectCardDiv:{
    width:'20%',
    
  },
  sidebarDiv:{
    width:'100%',

  }
}