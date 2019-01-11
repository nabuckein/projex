import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import * as firebase from "firebase";


class NewRedline extends Component{
    constructor(props){
        super(props);
        this.state={
            clickedProjectNumber:this.props.clickedProjectNumber,     
            projects:[],
            projectNumberPassed:false     
        }       
      }
      UNSAFE_componentWillMount=(e)=>{
        var db = firebase.firestore();
        var projects =[];
        var projectsInFirebaseRef = db.collection('projects');
            projectsInFirebaseRef.get().then((snapshot)=>{
            snapshot.forEach(doc=>{
                projects.push(doc.data());
            })
            this.setState({projects:projects})
            })
      }
    componentWillUnmount=(e)=>{
        console.log("NewRedline WILL UNMOUNT");
        this.setState({clickedProjectNumber:" "});
    }
    handleBackClick=(e)=>{
        this.props.handleBackFromNewRedline();
    }
    handleSelectChange=(e)=>{
        
    }
	render(){
        var title;
        var projectOptions = [];
        var projectSelect = [];

        for(var n=0; n<=this.state.projects.length-1; n++){
            projectOptions.push(<option key={'newRedlineOption' + this.state.projects[n].projectName} value={this.state.projects[n].projectName}>{this.state.projects[n].projectName}</option>)
        }
        
        if(this.state.clickedProjectNumber===""){            
            title = "Please select a project you'd like to add a new redline to:";
            projectSelect.push(
                <select style={styles.selectNewRedlineInput} id="projectSelectId" onChange={this.handleSelectChange}>
                    <option key={'newRedlineOptionText'} value="optiontext"></option>
                    {projectOptions}    
                </select>)
        }else{
            title = this.state.clickedProjectNumber;
        }
        
        

		return(
			<StyleRoot>
				<div className="NewRedline" style={styles.NewRedline}>
                    <div className="title" style={styles.newRedlineTitleDiv}>
                        <label style={styles.newRedlineTitle}>{title}</label>
                        {projectSelect}
                    </div>
                        
                    
                    <div className="newRedlineButtonContainer" style={styles.newRedlineButtonsContainer}>
                        <button className="newRedlineButtonCancel" key="newRedlineButtonCancel" style={styles.newRedlineButtonCancel} onClick={this.handleBackClick}>BACK</button>
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default NewRedline;

const styles={
    NewRedline:{
        display:'flex',
        justifyContent:'center',
        width:'100%',
        height:'500px',
        flexWrap:'wrap',
    },
    selectNewRedlineInput:{
        width:'70%',
        fontSize:18,        
        textAlign:'center',
        marginTop:30,
        marginBottom:30, 
    },
    newRedlineTitleDiv:{
        margin:'300px 0 0 0',
        width:'100%'
    },
    newRedlineTitle:{
        color:'white',
        fontFamily:'Pathway Gothic One',
        fontSize:18
    },
    newRedlineButtonsContainer:{
        width:'100%',
        margin:'0 0 100px 0'
    },

    newRedlineButtonCancel:{
        height:40,
        backgroundColor:'white',
        borderTop:'none',
        borderBottom:'none',
        borderRight:'none',
        borderLeft:'none',
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