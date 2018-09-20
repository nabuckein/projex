import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import firebase from 'firebase'

//const firebase = require("firebase");

class NewProjectCardInfo extends Component{
    constructor(props){
        super(props);
        this.state={
          projects:this.props.currentProjects,
          projectExists:false
        }       
      }
    handleSubmitButtonClick=(e)=>{
        console.log("Project exists: ", this.state.projectExists);
        var projectNumberInputValue = document.getElementById('projectsNumber').value;
        var projectSelected;        
        for(var n=0; n<= this.state.projects.length-1; n++){
            if(this.state.projects[n].projectNumber === projectNumberInputValue){
                projectSelected = this.state.projects[n];
            }
        }        
        if(this.state.projectExists && !projectSelected.projectUsers.includes(this.props.currentUserDisplayName)){//IF THE INFORMATION ENTERED MATCHES AN EXISTING PROJECT
            this.props.toProjects();       
        }else if(!this.state.projectExists){
            this.props.addNewProject();
        }else{
            console.log("Error when trying to submit project");
            var errorText = document.getElementById('errorMessageId');
            errorText.style.color = 'red';
        }
    }
    handleProjectNameChange=(e)=>{
        
    }
    handleProjectNumberChange=(e)=>{
        var db = firebase.firestore();
        var match = false;
        var bindedThis = this;
        var projectNumberInputValue = document.getElementById('projectsNumber').value;
        db.collection('projects').where('projectNumber','==',projectNumberInputValue)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    match=true;                    
                    bindedThis.setState({projectExists:true})
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }
    handleSelectChange=(e)=>{
        //FILL OUT INPUT FIELDS WITH CORRESPONDING PROJECT
        var bindedThis = this;
        var db = firebase.firestore();
        var selectedProjectName = document.getElementById('projectSelectId').value;
        var projectsRef = db.collection('projects');
        projectsRef.where('projectName', '==', selectedProjectName).get()
            .then(snapshot => {
            snapshot.forEach(doc => {
               console.log(doc.id, '=>', doc.data());
               document.getElementById('projectsNumber').value = doc.id;
               document.getElementById('projectsName').value = doc.data().projectName;
               document.getElementById('projectsPlant').value = doc.data().projectPlant;
            });
            bindedThis.setState({projectExists:true})
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }
	render(){
        var projectOptions = [];
        for(var n=0; n<=this.props.currentProjects.length-1; n++){
            projectOptions.push(<option key={'option' + this.state.projects[n].projectName} value={this.state.projects[n].projectName}>{this.state.projects[n].projectName}</option>)
        }
		return(
			<StyleRoot>
				<div className="NewProjectCardInfo" style={styles.NewProjectCardInfo}>
                    <div style={styles.inputsContainer}>
                        <div style={styles.inputsDropdown}>
                        <label style={styles.labels}>Select an existing project from the drop-down list:</label>
                        <select style={styles.selectInput} id="projectSelectId" onChange={this.handleSelectChange}>
                            <option key={'optionText'} value="optiontext"></option>
                            {projectOptions}    
                        </select>
                        </div>
                        <div style={styles.inputsDiv}>
                            <label style={styles.labels}>Or enter a brand new project:</label>
                            <input id="projectsName" key="projectsNameKey" placeholder="Enter the new project's name" style={styles.input} autoFocus></input>
                            <input onChange={this.handleProjectNumberChange} id="projectsNumber" key="projectsNumberKey" placeholder="Enter the new project's number" style={styles.input}></input>
                            <input id="projectsPlant" key="projectsPlantKey" placeholder="Enter the new project's plant" style={styles.input}></input>
                        </div>
                        
                    </div>
                    <div style={styles.errorMessageDiv}>
                        <p style={styles.errorMessage} id="errorMessageId">Something is wrong, please check the information entered</p>
                    </div>
                    <div className="newProjectButtonsContainer" style={styles.newProjectButtonsContainer}>
                        <button className="newProjectButtonSubmit" key="newProjectButtonSubmit" style={styles.newProjectButtonSubmit} onClick={this.handleSubmitButtonClick}>SUBMIT</button>
                        <button className="newProjectButtonCancel" key="newProjectButtonCancel" style={styles.newProjectButtonCancel} onClick={this.props.handleCancelNewProjectClick}>CANCEL</button>
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default NewProjectCardInfo;

const styles={
    NewProjectCardInfo:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        marginTop:100
    },
    inputsContainer:{
        width:'40%',
        marginBottom:150
    },
    inputsDropdown:{

    },
    inputsDiv:{

    },
    labels:{
        backgroundColor:'transparent',
        color:'white',
        width:'100%',
        fontFamily:'Pathway Gothic One'
    },
    selectInput:{
        width:'70%',
        fontSize:18,        
        textAlign:'center',
        marginTop:30,
        marginBottom:30,        
    },
    input:{
        backgroundColor:'transparent',
        color:'white',
        width:'100%',
        fontSize:18,
        borderTop:'none',
        borderLeft:'none',
        borderRight:'none',
        borderBottom:'solid white 1px',
        textAlign:'center',
        marginTop:30,
        marginBottom:30,
        ':focus':{
            fontSize:22
        }
    },
    newProjectButtonsContainer:{
        display:'flex',
        justifyContent:'center',
        width:'100%'
    },
    newProjectButtonSubmit:{
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
    newProjectButtonCancel:{
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
    errorMessageDiv:{

    },
    errorMessage:{
        color:'transparent'
    }
}