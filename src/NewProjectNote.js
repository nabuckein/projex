import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class NewProjectNote extends Component{
	handleBackClick=(e)=>{
        this.props.handleBackFromNewProjectNote();
    }
	render(){
		return(
			<StyleRoot>
				<div className="NewProjectNote">
                    <input style={styles.inputs} placeholder="Enter new note"></input>
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

    },
    inputs:{
        
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