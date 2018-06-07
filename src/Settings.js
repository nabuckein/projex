import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class Settings extends Component{
    constructor(props){
        super(props);
       
        this.projectsArr = [];
        this.projectsTabs=[];
      }

    componentWillMount=(e)=>{
        
        var db = firebase.firestore();
      
        var cityRef = db.collection('users').doc(this.props.userDisplayName);
        var getDoc = cityRef.get()
            .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                this.projectsArr = doc.data().projects;
                console.log(this.projectsArr);
            }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }
    handleBackClick=(e)=>{
        this.props.handleBackFromSettings();
    }
	render(){
        var projects = [];
        for(var n=0; n <= this.props.projects.length-1 ; n++){
            console.log("test");
        projects.push(<p style={styles.settingsProjectPriorityProjectNames} key={"settingsKeysProjects" + n}>{this.props.projects[n].projectName}</p>);
        }
		return(
			<StyleRoot>
				<div className="Settings">
                <div className="settingsProjectPriorityDiv">
                    <p className="settingsProjectPriorityTitle" style={styles.settingsProjectPriorityTitle}>Set your projects' priority:</p>
                    {projects}
                </div>
                <div className="settingsButtonContainer" style={styles.settingsButtonContainer}>
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
    settingsProjectPriorityTitle:{
        fontFamily:'Gugi',
        color:'white'
    },
    settingsProjectPriorityProjectNames:{
        fontFamily:'Montserrat',
        color:'white',
        fontSize:16
    },
    settingsButtonContainer:{
        display:'flex',
        justifyContent:'center',
    },
    settingsButtonSubmit:{
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