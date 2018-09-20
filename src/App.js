import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import TitleBar from './TitleBar.js';
import ProjectCard from './ProjectCard.js';
import Login from './Login.js';
import Signup from './Signup.js';
import LoginOrSignup from './LoginOrSignup.js'
import AddProjectCard from './AddProjectCard.js';
import NewProjectCardInfo from './NewProjectCardInfo.js';
import NewProjectNote from './NewProjectNote.js';
import ProjectsTabs from './ProjectsTabs.js';
import ProjectOverview from './ProjectOverview.js';
import Loading from './Loading.js';
import Settings from './Settings.js';
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBXMeHoR1iDD4akXK_k5NzAFhqU9p-Wd7Q",
  authDomain: "projexboard.firebaseapp.com",
  databaseURL: "https://projexboard.firebaseio.com",
  projectId: "projexboard",
  storageBucket: "projexboard.appspot.com",
  messagingSenderId: "273809119251",
      
}

firebase.initializeApp(config);
const firestore = firebase.firestore(); //NEED THESE 3 LINES BEFORE ANY CLOUD FIRESTORE CALLS (NEW RULES FROM FIREBASE 04/21/18)
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      componentToDisplay:"LoginOrSignup",
      projects:[],
      currentUser:'none',
      projectOverviewTitle:' ',
      projectOverviewNumber:'0',
      projectOverviewPlant:'none',
      projectPriority:false,
      projectClickedName:'',
      projectClickedNumber:'',
      projectClickedPlant:'',
      shortcutListener:true,
      currentNotesForCurrentUser:[]
    }
    this.projects = [];
    this.projectsTabs=[];
  }

  componentWillMount=(e)=>{
    fetch('./Users/sanchem49/Desktop/voicemail.-VPN.txt')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        //console.log("Something happened", response.json());
        // Examine the text in the response
        response.text().then(function(data) {
          console.log(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

    this.firebaseUserSignedInFunction();
    this.getCurrentNotesForCurrentUser();
  }
  
  getProjectPriorities=(number)=>{
    console.log(number);    
    this.toNewNote();    
  }
  getCurrentProjectsInFirebase=(e)=>{
    var db=firebase.firestore();
    var projects =[];
    var projectsInFirebaseRef = db.collection('projects');
        projectsInFirebaseRef.get().then((snapshot)=>{
          snapshot.forEach(doc=>{
            projects.push(doc.data());
          })
          this.setState({projects:projects, componentToDisplay: "Projects"})
        })
  }
  getCurrentNotesForCurrentUser=(e)=>{
    var db=firebase.firestore();
    var notesArr = [];
    db.collection('notes').get().then(snapshot=>{
      snapshot.forEach((doc)=>{
        var userName = doc.id;
        
        notesArr.push({[userName]:doc.data()});
      })
      this.setState({currentNotesForCurrentUser:notesArr});
    });
    //
  }
  
  aPressed=(e)=>{
    var char = e.which || e.keyCode;
    console.log("Unicode CHARACTER code: " + char);
    if(this.state.shortcutListener){
      switch(char){
        case 97:
          this.toNewProjectCardInfo();
          break;
        case 65:
          this.toNewProjectCardInfo();
          break;
        case 78:
          this.getProjectPriorities(10)
          break;
        default:
          return null
      }
    }
    
    //this.toNewProjectCardInfo
  }
  shortcutListener=(e)=>{
    //this.setState({shortcutListener:false})
    document.removeEventListener('keydown', this.aPressed);
  }
  shortcutListenerOn=(e)=>{
    //this.setState({shortcutListener:true})
    document.addEventListener('keydown', this.aPressed);
  }
  firebaseUserSignedInFunction=(e)=>{
    
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        console.log("%cCURRENT USER'S E-MAIL: " + user.email, "background: blue; color:white"); //WE CAN LOG USER'S E-MAIL BECAUSE
        //THE USER NEEDS TO ENTER HIS/HER E-MAIL WHEN SIGNING UP, BUT WE CAN'T SEE THE DISPLAYNAME IN THE FOLLOWING LINE BECAUSE
        //THE DISPLAYNAME GETS UPDATED INSIDE THE .then() PART OF THE FUNCTION, SEE SIGNUP COMPONENT.
        //console.log("%cCURRENT USER'S DISPLAY NAME: " + user.displayName, "background: orange; color:black");
        var db = firebase.firestore();
        var projArr = [];
        var projectsInFirebaseRef = db.collection('projects');
        projectsInFirebaseRef.get().then((snapshot)=>{
          snapshot.forEach(doc=>{
            projArr.push(doc.data());
          })
          this.setState({projects:projArr, currentUser:user, componentToDisplay: "Projects"})
        })
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
  handleBackFromProjectOverviewClick=(e)=>{
    this.setState({componentToDisplay:"Projects"});    
  }
  handleBackFromSettings=(e)=>{
    this.setState({componentToDisplay:"Projects"});    
  }
  handleBackFromNewProjectNote=(e)=>{
    this.setState({componentToDisplay:"Projects"});    
  }
  
  toNewNote=(e)=>{
    if(typeof e!== 'undefined'){
      this.setState({componentToDisplay:"NewNote", projectOverviewTitle:e.currentTarget.className});
    }
    else{
      this.setState({componentToDisplay:"NewNote"});
    }

  }
  toProjects=(e)=>{    
    
    //GET VALUES IN INPUT FIELDS---------------------------------//
    //var projName = document.getElementById('projectsName').value;
    var projNumber = document.getElementById('projectsNumber').value;
    //var projPlant = document.getElementById('projectsPlant').value;
    var projSelect = document.getElementById('projectSelectId').value;
    //-----------------------------------------------------------//
    var db=firebase.firestore();
    
    if(this.state.projects.length>0){
      for(var n=0; n<=this.state.projects.length-1; n++){
        //IF THE SPECIFIED PROJECT NUMBER IS IN FIREBASE, ADD THE CURRENT USER'S DISPLAY NAME TO THE PROJECT'S USERS ARRAY
        if((this.state.projects[n].projectNumber===projNumber && typeof projNumber!=='undefined') || (this.state.projects[n].projectNumber===projSelect && typeof projSelect!=='undefined')){
          var projRef = db.collection('projects').doc(projNumber);
          var currentProjUsers = [];
          db.runTransaction(t=>{
            return t.get(projRef).then(doc=>{
              currentProjUsers = doc.data().projectUsers;
              currentProjUsers.push(this.state.currentUser.displayName);
              //var updatedProjUsers = currentProjUsers;
              t.update(projRef, {projectUsers: currentProjUsers});
            });
          }).then(result=>{
            console.log('Transaction success!');
            this.getCurrentProjectsInFirebase();
          }).catch(err=>{
            console.log(err);
          });
          console.log("project EXISTS already!");
        }
        else{ //IF THE SPECIFIED PROJECT NUMBER IS NOT IN FIREBASE YET, CREATE A BRAND NEW PROJECT IN FIREBASE
          console.log('SEE toProjects in App.js');
          }
        }
      }
  }
  addNewProject=(e)=>{
    //GET VALUES IN INPUT FIELDS---------------------------------//
    console.log("NEW PROJECT CREATED");
    var projName = document.getElementById('projectsName').value;
    var projNumber = document.getElementById('projectsNumber').value;
    var projPlant = document.getElementById('projectsPlant').value;
    //var projSelect = document.getElementById('projectSelectId').value;
    var projectsObj = {        
      projectName:projName,
      projectPlant:projPlant,
      projectNumber:projNumber,
      projectPriority:0,
      projectAvailable:true,
      projectUsers:[this.state.currentUser.displayName]
    }
    var db = firebase.firestore();
    //var projArr =[projectsObj];
    var currentArr = [];
    var docRef = db.collection('projects').doc(projNumber);
    docRef.set(projectsObj);
    db.collection('projects').get().then(snapshot=>{
      snapshot.forEach(doc=>{
        currentArr.push(doc.data());
      })
      this.setState({projects:currentArr, componentToDisplay: "Projects"})
    });
  }
  toProjectOverview=(e)=>{   
    console.log(e.currentTarget.id);
    this.setState({componentToDisplay:"ProjectOverview", projectOverviewTitle:e.currentTarget.className});
  }
  toSettings=(e)=>{
    this.setState({componentToDisplay:"Settings"});
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
  handleProjectCardClick=(e)=>{
    //console.log(e.target.id);
    
  }
  addNewNoteTodo=(e)=>{
    console.log("ADD NEW NOTE ON <AddProjectCard/> CLICKED");
    
  }
  
  render() {
    
    if(this.state.componentToDisplay==="Signup" && this.state.currentUser===null){
      document.removeEventListener('keydown', this.aPressed);
      return (
        <div className="App" style={styles.App}>
          <Signup handleCancelSignupClick={this.handleCancelSignupClick}/> 
        </div>
      );
    }
    else if(this.state.componentToDisplay==="Settings"){
      return(
        <div className="App" style={styles.App}>
          <div style={styles.titleBar}>
            <TitleBar currentUser={this.state.currentUser} toSettings={this.toSettings}/>
          </div>
          
          <Settings projects={this.state.projects} handleBackFromSettings={this.handleBackFromSettings} userDisplayName={this.state.currentUser.displayName}/>
        </div>
          )
    }   
    else if(this.state.componentToDisplay==="Login" && this.state.currentUser===null){
      document.removeEventListener('keydown', this.aPressed);
      return (
        <div className="App" style={styles.App}>
          <Login handleCancelLoginClick={this.handleCancelLoginClick}/>
        </div>
      );
    }
    else if(this.state.componentToDisplay==="Projects" && this.state.currentUser!==null){
      /*if(this.state.shortcutListener){
        document.addEventListener('keydown', this.aPressed);
      }*/
      var projectPriorityShortcut = 0;
      this.projects=[];
      this.projectsTabs=[];
      //console.log("LINE 274",this.state.projects);
      if(typeof this.state.projects!== 'undefined'){ 
        var count=0;
        for(var n in this.state.projects){
          //ONLY DISPLAY PROJECTS THAT CONTAIN THE CURRENT USER
          if(this.state.projects[n].projectUsers.includes(this.state.currentUser.displayName)){
            count++;
            this.projects.push(<div key={"projectCardDivKey" + n} style={styles.projectCard}><ProjectCard shortcutListenerOn={this.shortcutListenerOn} shortcutListener={this.shortcutListener} key={"projectCard" + n} toNewNote={this.toNewNote} toProjectOverview={this.toProjectOverview} getCurrentProjectsInFirebase={this.getCurrentProjectsInFirebase} currentUserDisplayName={this.state.currentUser.displayName} projects={this.state.projects} projectPriorityShortcut={projectPriorityShortcut} getCurrentNotesForCurrentUser={this.getCurrentNotesForCurrentUser} notes={this.state.currentNotesForCurrentUser} title={this.state.projects[n].projectName} plant={this.state.projects[n].projectPlant} number={this.state.projects[n].projectNumber}/></div>);
            this.projectsTabs.push(<div key={"projectsTabsDivKey" + n} style={styles.projectsTabs}><ProjectsTabs key={"projectTab" + n} title={this.state.projects[n].projectName} plant={this.state.projects[n].projectPlant} number={this.state.projects[n].projectNumber}/></div>);
          }
        }
        if(count<1){
          this.projects.push(<div key={"projectCardDivKey" + n} style={styles.projectCard}><p style={styles.noProjectsAssignedMessage}>NO PROJECTS HAVE BEEN ADDED YET.</p></div>);
        }
        return (
          <StyleRoot>
            <div className="App" style={styles.App}>
              <div style={styles.titleBar}>
                <TitleBar currentUser={this.state.currentUser} toSettings={this.toSettings}/>
              </div>
              {
                /*<div style={styles.projectsTabsDiv}>
                {this.projectsTabs}
              </div>*/
              }
              <div style={styles.addProjectCardDiv}>
                <AddProjectCard toNewProjectCardInfo={this.toNewProjectCardInfo} addProjectVisibility={true} addReminderVisibility={true} addNoteTodoVisibility={true}/>
              </div>
              <div style={styles.projectCardDiv}>
                {this.projects}
              </div>
              {/*<div style={styles.remindersDiv}>
                <Reminders/>
            </div>*/}
              
            </div>
          </StyleRoot>
        );
      }else{
        console.log("no projects yet");
        return(
          <StyleRoot>
            <div className="App" style={styles.App}>
              <div style={styles.titleBar}>
                <TitleBar currentUser={this.state.currentUser} toSettings={this.toSettings}/>
              </div>
              
              {/*<div style={styles.remindersDiv}>
                <Reminders/>
              </div>*/}
              <div style={styles.addProjectCardDiv}>
                <AddProjectCard toNewProjectCardInfo={this.toNewProjectCardInfo} addProjectVisibility={true} addReminderVisibility={true} addNoteTodoVisibility={false}/>
              </div>
            </div>
          </StyleRoot>
        )
      }
    }
    else if(this.state.componentToDisplay==="ProjectOverview" && this.state.currentUser!==null){
      document.removeEventListener('keydown', this.aPressed);
      return (
        <StyleRoot>
          <div className="App" style={styles.ProjectOverviewState}>

            <div style={styles.titleBar}>
              <TitleBar currentUser={this.state.currentUser}/>
            </div >

            <div style={styles.projectOverviewTitleDiv}>
              <p style={styles.projectOverviewTitle}>{this.state.projectOverviewTitle}</p>
            </div>

            <div style={styles.projectOverviewDiv}>   

              <div style={styles.projectOverview}>
                <ProjectOverview title={this.state.projectOverviewTitle} backToProjects={this.handleBackFromProjectOverviewClick}/>
              </div>

              <div style={styles.addProjectCardDiv}>
                <AddProjectCard addNewNoteTodo={this.addNewNoteTodo} addProjectVisibility={false} addReminderVisibility={false} addNoteTodoVisibility={true}/>
              </div>

            </div>

          </div>
        </StyleRoot>
      );
    }
    else if(this.state.componentToDisplay==="NewNote" && this.state.currentUser!==null){
      document.removeEventListener('keydown', this.aPressed);
      return <NewProjectNote currentProjects={this.state.projects} handleCancelNewProjectClick={this.handleCancelNewProjectClick} handleBackFromNewProjectNote={this.handleBackFromNewProjectNote} currentUserDisplayName={this.state.currentUser.displayName} projectNumber={this.state.projectOverviewTitle}/>
      } 
    else if(this.state.componentToDisplay==="NewProject" && this.state.currentUser!==null){
      document.removeEventListener('keydown', this.aPressed);
      return <NewProjectCardInfo handleCancelNewProjectClick={this.handleCancelNewProjectClick} addNewProject={this.addNewProject} toProjects={this.toProjects} currentProjects={this.state.projects} currentUserDisplayName={this.state.currentUser.displayName}/>
      } 
    
    else if(this.state.componentToDisplay==="LoginOrSignup" && this.state.currentUser===null){
      document.removeEventListener('keydown', this.aPressed);
        return <LoginOrSignup toLogin={this.toLogin} toSignup={this.toSignup}/>
      }
    else if(this.state.componentToDisplay==="LoginOrSignup" && this.state.currentUser!==null){
      document.removeEventListener('keydown', this.aPressed);
      return <Loading/>;
    } 

    else{
      document.removeEventListener('keydown', this.aPressed);
      return null;
    }
  }
    
    
  
}

export default App;

const styles={
  App:{
    display:'flex',
    flexWrap:'wrap',
    height:'100%',    
    justifyContent:'center',
    width:'100%'
  },
  ProjectOverviewState:{
    display:'flex',
    flexWrap:'wrap',        
    width:'100%',    
  },
  titleBar:{
    backgroundColor:'black',
    width:'100%',
    height:'80px',
    margin:0,    
    paddingTop:0,
    paddingBottom:0,
    paddingRight:0,
    paddingLeft:'5%',
    borderBottom:'solid white 1px',
    
  },
  projectsTabsDiv:{
    width:'15%',
    marginTop:20,
    display:'flex',
    justifyContent:'flex-start',
    flexWrap:'wrap',
    flexDirection:'column',
    
  },
  projectsTabs:{
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto'

  },
  projectCardDiv:{
    width:'65%',
    height:'100%',
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    marginTop:50,
    '@media (max-width: 430px)': {        
      width:'90%',
      margin:'0 auto 0 auto',
      justifyContent:'center',
    }
  },
  projectCard:{
    width:'45%',
    heigth:'100%',
    marginLeft:10,
    marginRight:10,
    marginTop:20,
    '@media (max-width: 430px)': {        
      width:'100%',
      margin:'20 auto 0 auto',
      justifyContent:'center',
    }
  },
  projectOverviewTitleDiv:{
    width:'100%',
    margin:0
  },
  noProjectsAssignedMessage:{
    fontFamily:'Pathway Gothic One',
    fontSize:30,
    color:'white'
  },
  projectOverviewTitle:{
    marginTop:50,
    color:'white',
    fontFamily:'Pathway Gothic One',
    fontSize:30,
    width:'100%',
    height:70  
  },
  projectOverviewDiv:{
    margin:0,
    padding:0,
    width:'100%',    
    display:'flex',
    flexWrap:'wrap'
  },
  projectOverview:{
    width:'90%'
  },
  remindersDiv:{
    width:'25%',
    textAlign:'center',
    marginTop:50
  },
  addProjectCardDiv:{
    width:'10%',
    marginTop:50,
    '@media (max-width: 430px)': {        
      width:'100%',
      margin:0
    }
  },
  sidebarDiv:{
    width:'100%',

  }
}