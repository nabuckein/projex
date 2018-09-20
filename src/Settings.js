import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import ProjectsList from './ProjectsList.js';
import DeleteUser from './DeleteUser.js';
import TitleBar from './TitleBar.js';

const firebase = require("firebase");
class Settings extends Component{

    constructor(props){
        super(props);
        this.state={
            projectsID:null,
            projects:[],
            users:null,
            setProjectPriorityVisibility:true,
            deleteUserButtonVisibility:true
            
        }
        this.projects = [];
      }
    componentWillMount=(e)=>{        
        
        for(var n=0; n <= this.props.projects.length-1 ; n++){
            this.projects.push(<div key={'ProjectsListKeyDiv' + n} style={styles.projectsDiv}><p style={styles.settingsProjectPriorityProjectNames} key={"settingsKeysProjects" + n}>{this.props.projects[n].projectName}</p><input key='projectsListInputKey' style={styles.projectPriorityInput}></input></div>);
        }  
        this.getCurrenUsers();   
        this.getAllProjectsID(); 
        this.getAllProjects();
    }
    getCurrenUsers=(e)=>{
        var db=firebase.firestore();
        var usersArr = [];
        db.collection('users').get().then(snapshot=>{
          snapshot.forEach((doc)=>{
            var userName = doc.id;
            
            usersArr.push(userName);
          })
          this.setState({users:usersArr});
        });
    }
    
    getAllProjectsID=(e)=>{
        var db=firebase.firestore();
        var projArr = [];
        db.collection('projects').get().then(snapshot=>{
          snapshot.forEach((doc)=>{
            //var userName = doc.id;            
            projArr.push(doc.id);
            
          })
          this.setState({projectsID:projArr});
        });
    }
    getAllProjects=(e)=>{
        var db=firebase.firestore();
        var projArr = [];
        db.collection('projects').get().then(snapshot=>{
          snapshot.forEach((doc)=>{
            //var userName = doc.id;            
            projArr.push(doc.data());
            
          })
          this.setState({projects:projArr});
        });
    }
    handleBackClick=(e)=>{
        this.props.handleBackFromSettings();
    }
    handleSetPriorityClick=(e)=>{
        this.setState({setProjectPriorityVisibility:false})
    }
   
    handleDeleteUserClick=(e)=>{
        console.log("%cDELETE USER HAS BEEN CLICKED","background: red; color:yellow");
   
        this.setState({deleteUserButtonVisibility:false});
    }

	render(){
        //var projects = [];
        var projectsPriority = [];
        
        if(this.state.setProjectPriorityVisibility){
            projectsPriority.push(<div style={styles.settingsButtonDiv} key="setProjectPriorityButtonDivKey"><button style={styles.settingsButtons} onClick={this.handleSetPriorityClick} key='setProjectPriorityButtonKey'>Set projects priority</button></div>);
        }else{
            projectsPriority.push(<ProjectsList projects={this.projects} key='ProjectListKey'/>);
        }
        if(this.state.deleteUserButtonVisibility){
            projectsPriority.push(<div style={styles.settingsButtonDiv} key="deleteUserButtonDivKey"><button style={styles.settingsButtons} onClick={this.handleDeleteUserClick} key='deleteUserButtonKey'>Delete user</button></div>);
        }else{
            projectsPriority.push(<DeleteUser projectsID={this.state.projectsID} projects={this.state.projects} users={this.state.users} key='DeleteUserKey' currentUserDisplayName={this.props.userDisplayName}/>);
        }
		return(
			<StyleRoot>
				<div className="Settings" style={styles.Settings}>
                <div style={styles.settingsMainContainerDiv}>
                    <div className="settingsProjectPriorityDiv" style={styles.settingsProjectsDiv}>
                        
                        {projectsPriority}  
                        
                        {/*<p className="settingsProjectPriorityTitle" style={styles.settingsProjectPriorityTitle}>Set your projects' priority:</p>
                        {projects}*/}
                    </div>
                    
                    
                </div>
                <div className="settingsButtonContainer" style={styles.settingsButtonsContainer2}>
                    <button className="settingsButtonSubmit" key="settingsButtonSubmit" style={styles.settingsButtonSubmit} onClick={this.handleSaveClick}>SAVE</button>
                    <button className="settingsButtonCancel" key="settingsButtonCancel" style={styles.settingsButtonCancel} onClick={this.handleBackClick}>BACK</button>
                </div>
				</div>
			</StyleRoot>
		)
	}
}

export default Settings;

const styles={
    Settings:{
        display:'flex',
        justifyContent:'center',
        width:'100%',
        flexWrap:'wrap'
    },
    projectsDiv:{
        width:'50%',
        display:'flex',
        marginLeft:'auto',
        marginRight:'auto',
        alignItems:'baseline'
    },
    projectPriorityInput:{
        width:'10%',
        height:22,
        borderTop:'none',
        borderRight:'none',
        borderLeft:'none',
        borderBottom:'solid white 1px',
        borderRadius:3,
        background:'transparent',
        color:'white',
        textAlign:'center'
    },
    settingsMainContainerDiv:{
        width:'100%',
        margin:'0 0 100px 0'
    },
    settingsProjectsDiv:{
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'wrap',
        margin:'100px 0 50px 0',
    },
    settingsProjectPriorityTitle:{
        fontFamily:'Gugi',
        color:'white'
    },
    settingsProjectPriorityProjectNames:{
        fontFamily:'Montserrat',
        color:'white',
        fontSize:16,
        width:'95%',
        textAlign:'left'
    },
    settingsButtonDiv:{
        width:'100%',
        margin:'10px 0 10px 0'  
    },
    settingsButtons:{
        fontFamily:'Pathway Gothic One',
        fontSize:24,
        height:38,
        width:200,
        borderTop:'none',
        borderBottom:'none',
        borderRight:'none',
        borderLeft:'none',
        borderRadius:3,
        backgroundColor:'purple',
        color:'white',
        ':hover':{
            backgroundColor:'orange',
            color:'white'
        }
    },
    settingsButtonsContainer2:{
        display:'flex',
        justifyContent:'center',
    },
    settingsButtonSubmit:{
        height:40,
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
    settingsButtonCancel:{
        height:40,
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