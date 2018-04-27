import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class NewProjectCardInfo extends Component{
    handleSubmitButtonClick=(e)=>{
        var db=firebase.firestore();
        var projName = document.getElementById('projectsName').value;
        var projNumber = document.getElementById('projectsNumber').value;
        var projPlant = document.getElementById('projectsPlant').value;
        db.collection('projects').doc(projNumber).set({
            projectName:projName,
            projectPlant:projPlant
        })
        
    }
	render(){
		return(
			<StyleRoot>
				<div className="NewProjectCardInfo" style={styles.NewProjectCardInfo}>
                    <div style={styles.inputsContainer}>
                        <input id="projectsName" placeholder="Enter the new project's name" style={styles.input}></input>
                        <input id="projectsNumber" placeholder="Enter the new project's number" style={styles.input}></input>
                        <input id="projectsPlant" placeholder="Enter the new project's plant" style={styles.input}></input>
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
    },
    inputsContainer:{
        width:'40%',
        marginBottom:150
    },
    input:{
        width:'50%',
        backgroundColor:'transparent',
        color:'white',
        width:'70%',
        fontSize:14,
        borderTop:'none',
        borderLeft:'none',
        borderRight:'none',
        borderBottom:'solid white 1px',
        textAlign:'center',
        marginTop:30,
        marginBottom:30
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
}