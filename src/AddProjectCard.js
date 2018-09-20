import React, { Component } from 'react';
import {StyleRoot} from 'radium';


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
        '@media (max-width: 430px)':{
            display:'flex',
            justifyContent:'space-around',
            marginTop:16
        }
    },
    icon:{
        fontSize:50,
        width:'100%',
        marginBottom:10,
        '@media (max-width: 430px)':{            
            fontSize:26
        }
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
        },
        '@media (max-width: 430px)':{
            width:'20%',
            fontSize:8
        }


    }
}