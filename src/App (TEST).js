import React, { Component } from 'react';
import TitleBar from './TitleBar.js';
import ProjectCard from './ProjectCard.js';
import Login from './Login.js';
import Signup from './Signup.js';
import LoginOrSignup from './LoginOrSignup.js'
import Sidebar from './Sidebar.js';
import AddProjectCard from './AddProjectCard.js';
import NewProjectCardInfo from './NewProjectCardInfo.js';
import NewProjectNote from './NewProjectNote.js';
import Reminders from './Reminders.js';
import ProjectsTabs from './ProjectsTabs.js';
import ProjectOverview from './ProjectOverview.js';
import Loading from './Loading.js';
import Settings from './Settings.js';
import * as firebase from "firebase";


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      componentToDisplay:"LoginOrSignup",
      projects:[],
      currentUser:'none',
      projectOverviewTitle:'none',
      projectOverviewNumber:'0',
      projectOverviewPlant:'none',
      projectPriority:false
    }
    this.projects = [];
    this.projectsTabs=[];
  }

  componentWillMount=(e)=>{
    var config = {
        apiKey: "AIzaSyBXMeHoR1iDD4akXK_k5NzAFhqU9p-Wd7Q",
        authDomain: "projexboard.firebaseapp.com",
        databaseURL: "https://projexboard.firebaseio.com",
        projectId: "projexboard",
        storageBucket: "",
        messagingSenderId: "273809119251",
        privateKeyId:'9a2ed0d70810ace66c4f0811dfe79280da3a5a60',
        clientEmail:'firebase-adminsdk-i0a8g@projexboard.iam.gserviceaccount.com',
        privateKey: "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCv66qXHR84Vu0Z\nMuJwZwbrL1xhkGhFDLRgYWtm87w8f2YUNy2EmSoeqAlgdViUq5mr2S7nflusU1Nk\nctuzQaoJgJ5Naej1e5g/EUAFLrjZ5prXzqX8Iy4AFmYt1ulRoP0b+otjC+ZZjnX+\nUswxJ2ozvAuJr2sBvO2fqIQTHOBoSUNigXun7GCJIrkS5woRbOD8vgd5rHy4l+gz\nZ2vn65ZJ3k5tPIyQ72yObhisr1879wmWaWmBU4S1qtCpxwRa/7iV4YnTLJtM7a66\nv21J8aJ9a4eFe+PVjxyaJ6masZE8+XroX1/zFvTblfk7hTc18E8bLMxvgRU8eFXL\naTAJ1b+XAgMBAAECggEAQlsSLY2+iPHA3RBkeSFjarKilepyahkwsGoOqPamuesU\nBewKL0nWqVmYr9mTYACaJkf1eTwgOA/2FJ1+YU8TZCIvk+OvC2ljM+a9zzagYxCo\nt14rHb/nSgEo6YF24GNpFXSbvvBuIrmpqBRzENddJ8Z2U6jnI/CvcNmPd+YcfzkC\n+LHzcbks6XgczYDX+39KIFs4wSzsJmdnPu3BmxsunCIjMgIbuUEEaU98Z/GZyNIZ\nvXtPZfYspZvglNTPAO59qPlUor2D78uLZMq3XgwppFvBnBRkPhsZ4HJ0X1TRa5Am\nynSU+O1xMQmmUrsM7ysbipzZuHed/sU57fOdp0YOAQKBgQDe1vUpbnfXYVp3ilQZ\ni8JUF2zH91ij+ALQLvEAWOjAI/8Z7RBB7YF8RroUSowQJO0ZR1cQ3a6b8yXEErMh\nrg3Y7LdTXkm3gPIC8M1PzJsC89Od55Rkl4NHOZWfWzd7l1K2G9fYJAvMqATobNU1\n2Bu/hJpc5y8ncOx3VAr+/iALUQKBgQDKGVUvOX1/WhoLdWCtSZvpMSaR5a+re527\n/Z4EEptXewgjjoibi8TJkOZ+wW8DlyoOorIb+z1ShHYSjEBq+9eK6ba/XKwkHVhY\nRlHtWNlHDO8sJTcxgVNU1+jQkTxFseWLBub6Kia5M3RS9R1eN048g+1bmAwaoexh\nKteGw22SZwKBgQC//VOcLqDx396hv3xVxiPXb5c5cdHc84D4/HiHZBKj+F+BZs3q\n/0XgXM9VTCUAg9ADR4Or9FLL6eFP3QyYp+0mSExqd4HrqBzai71YU1/6Wzingy5G\nvINOij5u3Zgf03Bflf2RKv0/hkM0PRA1I8xEZWrZQBVQVeplpPMUXr4dAQKBgH9r\niXHE5YMt483lq5aWGl7kRlUmY6PSxJiKRt56fMajI3aHn0myzdfoK+svOjchT7r6\niSFrPjaQnYEEPHk3X6aNxFLSsxXyColdjLoAkr1hQkqrDCmCSG/t0TPu3flzOC53\no5mGifOqpWTIdkO4yvMMmtJtAvSnsslwoYKuJJ9xAoGBAJUEhNytuxm/e5u0GlVk\ne0rPTt+f0avm/hdXPnezSoKG4RQOD+RvRnmbykJmxL1SvwAWpzlTx47YZkFTzPTd\nzt7KnGtZ8Bx25dkbbMZXARhLsr7xp+Ca4Zqu+Z5+MbpgfSDLBbSWV2eDhrLTwbV3\nYJkSsC7hho3S/At7/a+XMjhn",

      };
      firebase.initializeApp(config);
      const firestore = firebase.firestore(); //NEED THESE 3 LINES BEFORE ANY CLOUD FIRESTORE CALLS (NEW RULES FROM FIREBASE 04/21/18)
      
      const settings = {/* your settings... */ timestampsInSnapshots: true};
      firestore.settings(settings);
      // Initialize the default app
      

      this.firebaseUserSignedInFunction();

      
  }
  getProjectPriorities=(number)=>{
    console.log(number);
    var db = firebase.firestore();
    /*db.collection('users').doc(this.state.currentUser.displayName).get().then((snapshot)=>{
      this.toNewNote();
    })*/
    var dbRef = db.collection('users');
    var proj = dbRef.where('email','==','mauro@baxter.com')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    //console.log(proj);
  }
  
  aPressed=(e)=>{
    var char = e.which || e.keyCode;
    console.log("Unicode CHARACTER code: " + char)
    switch(char){
      case 97:
        this.toNewProjectCardInfo();
      case 65:
        this.toNewProjectCardInfo();
      case 49:
        this.getProjectPriorities(1)
      default:
        return null
    }
    //this.toNewProjectCardInfo
  }

  firebaseUserSignedInFunction=(e)=>{
    
    firebase.auth().onAuthStateChanged((user)=> {
      
      if (user) {
        
        // User is signed in.
        console.log("%cCURRENT USER'S DISPLAY NAME: " + user.displayName, "background: blue; color:white");
        console.log("%cCURRENT USER'S E-MAIL: " + user.email, "background: blue; color:white"); //WE CAN LOG USER'S E-MAIL BECAUSE
        //THE USER NEDES TO ENTER HIS/HER E-MAIL WHEN SIGNING UP, BUT WE CAN'T SEE THE DISPLAYNAME IN THE FOLLOWING LINE BECAUSE
        //THE DISPLAYNAME GETS UPDATED INSIDE THE .then() PART OF THE FUNCTION, SEE SIGNUP COMPONENT.
        //console.log("%cCURRENT USER'S DISPLAY NAME: " + user.displayName, "background: orange; color:black");
        var db = firebase.firestore();
        var projArr = [];
        
        var projectsInFirebaseRef = db.collection('users').doc(user.displayName);
        projectsInFirebaseRef.get().then((snapshot)=>{
          //console.log(snapshot.data().settings.projectPriority);
          this.setState({projects:snapshot.data().projects, projectPriority:snapshot.data().settings.projectPriority, currentUser:user, componentToDisplay: "Projects"})
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
  handleDeleteProject=(e)=>{   

    //UPDATE STATE WITH CURRENT PROJECTS AFTER DELETING ONE PROJECT
    var db=firebase.firestore();
    
    var projectsInFirebaseRef = db.collection('users').doc(this.state.currentUser.displayName);
        projectsInFirebaseRef.get().then((snapshot)=>{
          this.setState({projects:snapshot.data().projects, componentToDisplay: "Projects"})
        })
    //-----------------------------------------------------------------//
  }
  toNewNote=(e)=>{
    this.setState({componentToDisplay:"NewNote"});
  }
  toProjects=(e)=>{    
    var projectsInFirebase = [];
    
    //GET VALUES IN INPUT FIELDS---------------------------------//
    var projName = document.getElementById('projectsName').value;
    var projNumber = document.getElementById('projectsNumber').value;
    var projPlant = document.getElementById('projectsPlant').value;
    //-----------------------------------------------------------//
    var db=firebase.firestore();   
    
    //THIS IS UPDATING THE ARRAY AND CONVERTING IT INTO AN OBJECT, projects NEEDS TO BE AN ARRAY IN ORDER FOR OUR STRUCTURE TO WORK
    var projectsObj = {        
          projectName:projName,
          projectPlant:projPlant,
          projectNumber:projNumber,
          projectPriority:0        
      }
    
    var projArr =[projectsObj];
    var currentArr = [];
    var docRef = db.collection('users').doc(this.state.currentUser.displayName); //REFERENCE THE CURRENTLY LOGGED IN USER
    var transaction = db.runTransaction(t => { //THIS TRANSACTION READS THE DOCUMENT WITH THE SPECIFIED docRef AND UPDATES IT WHEN
      //THE USER SUBMITS THE NEW PROJECT FROM NewProjectcardInfo COMPONENT
      return t.get(docRef)
          .then(doc => {
            // 
            currentArr = doc.data().projects;
            currentArr.push(projectsObj);
            t.update(docRef,{projects: currentArr});
           //console.log(doc.data().projects)
          });
    }).then(result => {
      console.log('Transaction success!');
      this.setState({projects:currentArr, componentToDisplay: "Projects"})
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
    /*
    db.collection('users/' + this.state.currentUser.displayName + '/projects').update({      
          
            [projNumber]:{
              projectName:projName,
              projectPlant:projPlant,
              projectNumber:projNumber
            }
         
            
    });    */

  }
  toProjectOverview=(e)=>{
    //console.log(e.target.parentNode.id);
    //var el = document.getElementById();
    console.log(e.currentTarget.id);
    this.setState({componentToDisplay:"ProjectOverview", projectOverviewTitle:e.currentTarget.id});
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
        <Settings projects={this.state.projects} handleBackFromSettings={this.handleBackFromSettings} userDisplayName={this.state.currentUser.displayName}/>
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
    else if(this.state.componentToDisplay==="Projects" && this.state.currentUser===null){
      document.removeEventListener('keydown', this.aPressed);
      return <Loading/>;
    }
    else if(this.state.componentToDisplay==="Projects" && this.state.currentUser!==null){
      document.addEventListener('keydown', this.aPressed);
      var projectPriorityShortcut = 0;
      

      this.projects=[];
      this.projectsTabs=[];
      for(var n=0; n<=this.state.projects.length-1; n++){
        if(this.state.projectPriority){
          projectPriorityShortcut = this.state.projects[n].projectPriority;
        }else{
          projectPriorityShortcut = n;
        }
        this.projects.push(<div key={"projectCardDivKey" + n} style={styles.projectCard} onClick={this.handleProjectCardClick}><ProjectCard key={"projectCard" + n} toProjectOverview={this.toProjectOverview} handleDeleteProject={this.handleDeleteProject} currentUserDisplayName={this.state.currentUser.displayName} projects={this.state.projects} projectPriorityShortcut={projectPriorityShortcut} notes={this.state.projects[n].notes} title={this.state.projects[n].projectName} plant={this.state.projects[n].projectPlant} number={this.state.projects[n].projectNumber}/></div>);
        this.projectsTabs.push(<div key={"projectsTabsDivKey" + n} style={styles.projectsTabs}><ProjectsTabs key={"projectTab" + n} title={this.state.projects[n].projectName} plant={this.state.projects[n].projectPlant} number={this.state.projects[n].projectNumber}/></div>);
      }
      return (
        <div className="App" style={styles.App}>
          <div style={styles.titleBar}>
            <TitleBar currentUser={this.state.currentUser} toSettings={this.toSettings}/>
          </div>
          {
            /*<div style={styles.projectsTabsDiv}>
            {this.projectsTabs}
          </div>*/
          }
          <div style={styles.projectCardDiv}>
            {this.projects}
          </div>
          <div style={styles.remindersDiv}>
            <Reminders/>
          </div>
          <div style={styles.addProjectCardDiv}>
            <AddProjectCard toNewProjectCardInfo={this.toNewProjectCardInfo} addProjectVisibility={true} addReminderVisibility={true} addNoteTodoVisibility={false}/>
          </div>
        </div>
      );
    }
    else if(this.state.componentToDisplay==="ProjectOverview" && this.state.currentUser!==null){
      document.removeEventListener('keydown', this.aPressed);
      return (
        
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
      );
    }
    else if(this.state.componentToDisplay==="NewNote" && this.state.currentUser!==null){
      document.removeEventListener('keydown', this.aPressed);
      return <NewProjectNote handleCancelNewProjectClick={this.handleCancelNewProjectClick} handleBackFromNewProjectNote={this.handleBackFromNewProjectNote}/>
      } 
    else if(this.state.componentToDisplay==="NewProject" && this.state.currentUser!==null){
      document.removeEventListener('keydown', this.aPressed);
      return <NewProjectCardInfo handleCancelNewProjectClick={this.handleCancelNewProjectClick} toProjects={this.toProjects}/>
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
    justifyContent:'center'
  },
  ProjectOverviewState:{
    display:'flex',
    flexWrap:'wrap',        
    width:'100%',    
  },
  titleBar:{
    backgroundColor:'black',
    width:'100%',
    height:'12%',
    margin:0,    
    padding:0,
    paddingLeft:'5%',
    borderBottom:'solid white 1px'
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
    marginTop:50
  },
  projectCard:{
    width:'45%',
    heigth:'100%',
    marginLeft:10,
    marginRight:10,
    marginTop:20
  },
  projectOverviewTitleDiv:{
    width:'100%',
    margin:0
  },
  projectOverviewTitle:{
    marginTop:50,
    color:'white',
    fontFamily:'Zilla Slab Highlight',
    fontSize:30,
    width:'100%',
    height:70,  
  },
  projectOverviewDiv:{
    margin:0,
    padding:0,
    width:'100%',    
    display:'flex',
    flexWrap:'wrap'
  },
  projectOverview:{
    width:'90%',
  },
  remindersDiv:{
    width:'25%',
    textAlign:'center',
    marginTop:50
  },
  addProjectCardDiv:{
    width:'10%',
    marginTop:50
    
  },
  sidebarDiv:{
    width:'100%',

  }
}