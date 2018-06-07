import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import * as firebase from "firebase";
import { bounceOut , rotateInUpLeft} from 'react-animations'

  

class ProjectCard extends Component {
  
  deleteProjectFromFirebase=(e)=>{    
    document.getElementById("ProjectCardTrash_" + this.props.title).className = "animated bounceOut 1s";
    var db=firebase.firestore();
    var currentProjectsArr = this.props.projects;
    var updatedProjectsArr = [];
    for(var n=0; n<=currentProjectsArr.length-1;n++){
      if(currentProjectsArr[n].projectName!==this.props.title){
        updatedProjectsArr.push(currentProjectsArr[n])
      }
    }
    

    
    var docRef = db.collection('users').doc(this.props.currentUserDisplayName); //REFERENCE THE CURRENTLY LOGGED IN USER
    var transaction = db.runTransaction(t => { //THIS TRANSACTION READS THE DOCUMENT WITH THE SPECIFIED docRef AND UPDATES IT WHEN
      //THE USER SUBMITS THE NEW PROJECT FROM NewProjectcardInfo COMPONENT
      return t.get(docRef)
          .then(doc => {           
            t.update(docRef,{projects: updatedProjectsArr});
          });
    }).then(result => {
      console.log('Transaction success!');
      //this.setState({projects:updatedProjectsArr, componentToDisplay: "Projects"})
    }).catch(err => {
      console.log('Transaction failure:', err);
    });


    this.props.handleDeleteProject();   
  }
  componentWillMount=(e)=>{
    console.log(this.props.projects);

  }
  render() {
    var notesArr = this.props.notes;
    var notes=[];
    if(typeof notesArr !== 'undefined'){ //IFF THERE ARE NOTES/TO-DOs ADD THEM TO AN ARRAY AND DISPLAY THEM IN {notes}
      for(var n=0; n<=notesArr.length-1;n++){
        notes.push( <div key={"listItemDiv" + n} style={styles.projectCardListItemsDiv}><li key={"listItem" + n} style={styles.projectCardListItem}>{this.props.notes[n]}</li>
        <button style={styles.projectCardListItemRemoveButton} key={"listItemButton1" + n}>REMOVE</button>
        <button style={styles.projectCardListItemDoneButton} key={"listItemButton2" + n}>ARCHIVE</button>
        </div>)
      }
    }else{ //NEED THIS IN CASE THERE ARE NO NOTES/TO-DOs YET.
      notes.push(<div key="keyEmptyListDiv" style={styles.projectCardListItemsDivEmpty}><p key="keyEmptyListParagraph" style={styles.projectCardListEmptyParagraph}>THERE ARE NO NOTES/TO-DOs YET</p>
      
      </div>)
    }
    
    return (
      <StyleRoot>
      <div id={"ProjectCardTrash_" + this.props.title} key={"ProjectCardKey" + this.props.title} style={styles.ProjectCard}>        
        <p style={styles.projectShortcutNumber}>{this.props.projectPriorityShortcut}</p>
        <p style={styles.projectCardTitle}>{this.props.title}</p>
        <p style={styles.projectCardProjectPlant}>{this.props.number + ' - ' + this.props.plant}</p>
        <p style={styles.projectCardRecentNotesTitle}>Recent notes/to-dos:</p>
        <div style={styles.projectCardListDiv}>
          <ol style={styles.projectCardList}>
            
             {notes}
            
          </ol>
        </div>
        <div style={styles.projectCardIconsDiv} key="iconProjectCardDiv1">
          <p style={styles.iconTrashParagraph} key="iconProjectCardParagraph1" onClick={this.deleteProjectFromFirebase}><i className="fas fa-trash" style={styles.icon} key="iconProjectCardI1" ></i></p>
          <p style={styles.iconAddnoteParagraph} key="iconProjectCardParagraph2" ><i className="fas fa-sticky-note" style={styles.icon} key="iconProjectCardI2" ></i></p>
          <div >
            <p style={styles.iconMaximizeProjectParagraph} key="iconProjectCardParagraph3" id={this.props.title + " - " + this.props.plant + " - " + this.props.number} onClick={this.props.toProjectOverview}><i className="fas fa-expand-arrows-alt" style={styles.icon} key="iconProjectCardI3" ></i></p>
          </div>
        </div>
      </div>
      </StyleRoot>
    )
  }
}

export default ProjectCard;

const styles = {
    ProjectCard:{
      backgroundColor:'gray',
      width:'100%',
      marginLeft:'auto',
      marginRight:'auto',
      paddingBottom:40,
      borderRadius:10,
      border:'solid transparent 4px',
      ':hover':{
        border:'solid white 4px'
      }
    },
    projectShortcutNumber:{
      color:'white', 
      fontFamily:'Gugi',
      fontSize:26
    },
    projectCardTitle:{
      color:'white', 
      fontFamily:'Gugi',
      marginBottom:0
    },
    projectCardProjectPlant:{
      color:'white',
      fontFamily:'Gugi',
      marginTop:10 
    },
    projectCardRecentNotesTitle:{
      color:'white',
      fontFamily:'Montserrat',
      marginTop:22, 
      textDecoration:'underline'
    },
    projectCardListItemsDiv:{
      display:'flex',
      alignItems:'baseline',
      justifyContent:'center',
      width:'100%'
    },
    projectCardListItemsDivEmpty:{
      display:'flex',
      alignItems:'baseline',
      justifyContent:'center',
      width:'100%'
    },
    projectCardListDiv:{
      width:'100%',
      margin:0
    },
    projectCardList:{
      padding:'0 0 50px 0',
      display:'flex',
      flexWrap:'wrap',
      width:'100%'
    },
    projectCardListItem:{
      color:'white',
      fontFamily:'Montserrat',
      fontSize:14,
      width:'50%',
      textAlign:'left',
      marginTop:10,  
      marginLeft:10,
      ':hover':{
        color:'orange'
      }     
    },
    projectCardListEmptyParagraph:{
      color:'white',
      fontFamily:'Montserrat',
      fontSize:16,
      width:'100%',
      textAlign:'center',
      marginTop:10,  
      marginLeft:10,
      ':hover':{
        color:'orange'
      }     
    },
    projectCardListItemRemoveButton:{
      fontFamily:'Gugi',
      fontSize:12,
      minWidth:'15%',
      backgroundColor:'darkred',
      color:'white',
      border:'none',
      borderRadius:3,
      
      marginRight:5,
      ':hover':{
        backgroundColor:'red'
      }
    },
    projectCardListItemDoneButton:{
      fontFamily:'Gugi',
      fontSize:12,
      minWidth:'15%',
      backgroundColor:'green',
      color:'white',
      border:'none',
      borderRadius:3,
      marginLeft:5,
      ':hover':{
        backgroundColor:'limegreen'
      }
    },
    projectCardIconsDiv:{
      display:'flex',
      justifyContent:'center',
      height:60
    },
    icon:{
      fontSize:40,      
      width:'100%'
    },
    iconTrashParagraph:{
        fontSize:20,
        boxSizing: 'border-box',
        marginLeft:15,
        marginRight:15,
        fontFamily:"Gugi",
        color:'white',
        ':hover':{
            fontSize:24,
            color:'orange'
        },
        ':active':{
            color:'white'
        }

    },
    iconAddnoteParagraph:{
        fontSize:20,
        boxSizing: 'border-box',
        
        marginLeft:15,
        marginRight:15,
        fontFamily:"Gugi",
        color:'white',
        ':hover':{
            fontSize:24,
            color:'limegreen'
        },
        ':active':{
            color:'white'
        }

    },
    iconMaximizeProjectParagraph:{
        fontSize:20,
        boxSizing: 'border-box',
        
        marginLeft:15,
        marginRight:15,
        fontFamily:"Gugi",
        color:'white',
        ':hover':{
            fontSize:24,
            color:'blue'
        },
        ':active':{
            color:'white'
        }

    }
    

}