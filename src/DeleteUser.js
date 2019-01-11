import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
const firebase = require("firebase");

class DeleteUser extends Component{
    constructor(props){
        super(props);
        this.state={
          projects:this.props.projects
        }
        
    }

    componentWillMount=(e)=>{
        var projArr = this.state.projects;
        //GET USERS OTHER THAN THE CURRENTLY LOGGED IN ONE.
        var optionsArr = [];
        this.props.users.forEach(item=>{
            if(item!==this.props.currentUserDisplayName){
                optionsArr.push(item);
            }            
        })
        //-----------------------------------------------
    }
    handleConfirmClick=(e)=>{
        var user = document.getElementById('select').value;
        var db=firebase.firestore();       
        var userSelectedProjects = [];
        var allUsersInTheProjects = [];
        var projArr = this.state.projects;
        projArr.forEach(proj=>{
            //proj.get().then(x=>{
                if(proj.projectUsers.includes(user)){
                    allUsersInTheProjects.push(proj.projectUsers); //PUSH THE PROJECT USERS TO THIS ARRAY IN ORDER TO LATER ON FILTER OUT THE
                    //SELECTED USER AND UPDATE THE ARRAY OF USERS IN FIREBASE
                    userSelectedProjects.push(proj.projectNumber); //PUSH THE PROJECT NUMBER OF THE PROJECT WHERE THE SELECTED USER IS INCLUDED 
                    //IN ORDER TO DELETE HIM DOWN BELOW.
                    var batch = db.batch();
                    var projRef=db.collection('projects').doc(proj.projectNumber);
                    var filteredProjectUsers = proj.projectUsers.filter(x=>x!=user);
                    batch.update(projRef,{projectUsers:filteredProjectUsers});
                    return batch.commit().then(function () {
                        // ...
                        console.log("Batch commited");
                      });
                }else{
                    console.log("NO MATCH");
                }
            //});
        });
        db.collection('archivedNotes').doc(user).delete();
        db.collection('notes').doc(user).delete();
        db.collection('users').doc(user).delete();
        
    }
	render(){
        var usersOption =[];
        this.props.users.forEach(item=>{
            if(item!==this.props.currentUserDisplayName){
                usersOption.push(<option key={"usersOptionKey" + item} id={"option" + item}>{item}</option>);
            }
        })
		return(
			<StyleRoot>
				<div className="DeleteUser">
                    <p style={styles.selectTitle}>Select the user you'd like to delete:</p>
                    <div style={styles.selectAndButtonDiv}>
                        <select style={styles.select} id="select">
                            {usersOption}
                        </select>
                        <button style={styles.confirmButton} onClick={this.handleConfirmClick}>CONFIRM</button>
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default DeleteUser;

const styles={
    selectTitle:{
        color:'white',
        fontSize:30,
        fontFamily:'Pathway Gothic One'
    },
    selectAndButtonDiv:{
        width:'100%',
        margin:'10px 0 10px 0'  ,
        display:'flex',
        justifyContent:'center'
    },
    select:{
        width:'60%',
        margin:'0 20px 0 0'
    },
    confirmButton:{
        fontFamily:'Pathway Gothic One',
        fontSize:18,
        height:30,
        width:100,
        borderTop:'none',
        borderBottom:'none',
        borderRight:'none',
        borderLeft:'none',
        borderRadius:3,
        backgroundColor:'darkred',
        color:'white',
        ':hover':{
            backgroundColor:'red',
            color:'white'
        }
    }
}