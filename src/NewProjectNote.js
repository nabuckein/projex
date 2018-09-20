import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import { firebase } from 'firebase'
//const firebase = require("firebase");

class NewProjectNote extends Component{
  constructor(props){
    super(props);
    this.state={
      projects:this.props.currentProjects,
      projectSelectedName:'',
      projectSelectedNumber:'',
      projectSelectedPlant:'',
      
    }
   
  }
  componentDidMount=(e)=>{
    var newNoteInput = document.getElementById('newNoteTextId');

    //newNoteInput.value = '1';
    //console.log(newNoteInput.value);
    newNoteInput.focus();
  }
	handleBackClick=(e)=>{
    this.props.handleBackFromNewProjectNote();
  }
  handleSaveClick=(e)=>{
    var newNoteTextValue = document.getElementById('newNoteTextId').value;
    var newNoteProjectNumberValue = document.getElementById('newNoteProjectNumberTextId').value;
    var db = firebase.firestore();
    if(newNoteTextValue!==""){
      db.collection('notes').doc(this.props.currentUserDisplayName).set({[newNoteProjectNumberValue]:[newNoteTextValue]});
    }
    else{
      console.log("New note is empty");
    }
  }
  handleProjectNumberChange=(e)=>{
    
  }
  handleFocusOnNewNote=(e)=>{
    var newNoteInput = document.getElementById('newNoteTextId');
    //console.log(newNoteInput);
    //newNoteInput.select();
    newNoteInput.value = '';
    
  }
  getSelectedProject=(e)=>{
    
  }
  handleSelectChange=(e)=>{
    //var projectSelectedNumber = document.getElementById('newNoteProjectNumberTextId');
    //this.getSelectedProject();
    //this.setState({projectSelectedNumber:projectSelectedNumber.value});
    var projectSelNumber = document.getElementById('projectSelectId');
    console.log(projectSelNumber.value);
    //var projectSelectedName = document.getElementById('newNoteProjectNameTextId');
    //var projectSelectedPlant = document.getElementById('newNoteProjectPlantTextId');
    var db = firebase.firestore();
    var dbRef = db.collection('projects');
    dbRef.where('projectNumber',"==", projectSelNumber.value)
    .get()
    .then(snapshot=>{
     snapshot.forEach(doc=>{
       console.log(doc.data());
       //projectSelectedNumber.value = doc.data().projectNumber;
       //projectSelectedName.value = doc.data().projectName;
       //projectSelectedPlant.value = doc.data().projectPlant;
       this.setState({projectSelectedNumber:doc.data().projectNumber});
     })
    }).catch(err=>{
      console.log(err);
    });
    //this.getSelectedProject();
  }
  
	render(){
    var projectOptions = [];
        for(var n=0; n<=this.props.currentProjects.length-1; n++){
          if(this.props.currentProjects[n].projectUsers.includes(this.props.currentUserDisplayName)){
            var optionFullValue = this.state.projects[n].projectNumber;
            projectOptions.push(<option value={optionFullValue} key={'option' + optionFullValue}>{optionFullValue}</option>)
          }
        }
		return(
			<StyleRoot>
				<div className="NewProjectNote">
            <div style={styles.addNoteTitleDiv}>
              <p style={styles.addNoteTitle}>Select a project (or enter the project's info) and enter a new note for that project:</p>
            </div>
            <select style={styles.selectInput} id="projectSelectId" onChange={this.handleSelectChange}>
              <option key={'optionText'} value="optiontext"></option>
              {projectOptions}    
            </select>
            <div style={styles.inputsContainer}>
              <input type="text" style={styles.inputs} placeholder="Enter note's project name" id="newNoteProjectNameTextId" key="newNnewNoteProjectNameTextKey"></input>
              <input type="text" style={styles.inputs} value={this.state.projectSelectedNumber} onChange={this.handleProjectNumberChange} placeholder="Enter note's project number" id="newNoteProjectNumberTextId" key="newNnewNoteProjectNumberTextKey"></input>
              <input type="text" style={styles.inputs} placeholder="Enter note's project plant" id="newNoteProjectPlantTextId" key="newNnewNoteProjectPlantTextKey"></input>
              <input type="text" style={styles.inputs} onFocus={this.handleFocusOnNewNote} placeholder="Enter new note" id="newNoteTextId" key="newNnewNoteTextKey"></input>
            </div>
					<div className="newProjectNoteButtonContainer" style={styles.newProjectNoteButtonContainer}>
						<button className="newProjectNoteButtonSubmit" key="newProjectNoteButtonSubmit" style={styles.newProjectNoteButtonSubmit} onClick={this.handleSaveClick}>SAVE</button>
						<button className="newProjectNoteButtonCancel" key="newProjectNoteButtonCancel" style={styles.newProjectNoteButtonCancel} onClick={this.handleBackClick}>BACK</button>
					</div>
				</div>
			</StyleRoot>
		)
	}
}

export default NewProjectNote;

const styles={
    NewProjectNote:{
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'center',
      marginTop:100
    },
    addNoteTitleDiv:{
      width:'100%',
    },
    addNoteTitle:{
      backgroundColor:'transparent',
      color:'white',
      width:'100%',
      fontFamily:'Pathway Gothic One'

    },
    selectInput:{
      
      
    },
    inputsContainer:{
      width:'40%',
      marginBottom:150,
      marginLeft:'auto',
      marginRight:'auto'
    },
    inputs:{
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
    newProjectNoteButtonContainer:{
        display:'flex',
        justifyContent:'center',
    },
    newProjectNoteButtonSubmit:{
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
    newProjectNoteButtonCancel:{
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