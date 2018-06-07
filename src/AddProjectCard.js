import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class AddProjectCard extends Component{

	render(){
        var showAddNoteTodo = this.props.addNoteTodoVisibility;
        var showAddProject = this.props.addProjectVisibility;
        var showAddReminder = this.props.addReminderVisibility;
        var addNoteTodo, addProject, addReminder; 

        if(showAddNoteTodo){
            addNoteTodo = <p style={styles.iconParagraph} onClick={this.props.addNewNoteTodo} key="icon3"><i className="fas fa-sticky-note" style={styles.icon} ></i>ADD NOTE/TO-DO</p>;
        }
        if(showAddProject){
            addProject = <p style={styles.iconParagraph} onClick={this.props.toNewProjectCardInfo} key="icon1" ><i className="fas fa-plus-square" style={styles.icon}></i>ADD NEW PROJECT</p>;
        }
        if(showAddReminder){
            addReminder = <p style={styles.iconParagraph} key="icon2"><i className="far fa-bell" style={styles.icon}></i>ADD NEW REMINDER</p>;
        }
		return(
			<StyleRoot>
				<div className="AddProjectCard" style={styles.AddProjectCard}>
                    {addProject}
                    {addReminder}
                    {addNoteTodo}
                </div>
			</StyleRoot>
		)
	}
}

export default AddProjectCard;

const styles={
    AddProjectCard:{
        width:'100%',
        
    },
    icon:{
        fontSize:50,
        width:'100%',
        marginBottom:10
    },
    iconParagraph:{
        width:'80%',
        fontSize:12,
        fontFamily:"Gugi",
        color:'white',
        ':hover':{
            color:'limegreen'
        },
        ':active':{
            color:'white'
        }

    }
}