import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import * as firebase from "firebase";

  

class ProjectCard extends Component {
  constructor(props){
    super(props);
    this.state={
      addNoteInputVisible:false,
      notes:this.props.notes,
      notesForThisUser:[],
      notesForThisUserAndThisProject:[]
    }
    this.notes=[];

  }
  
  deleteCurrentProjectUserFromFirebase=(e)=>{    
    document.getElementById("ProjectCardTrash_" + this.props.title).className = "animated bounceOut 1s";
    var db=firebase.firestore();
    //var currentProjectsArr = this.props.projects;
    //var updatedProjectsArr = [];
    var projRef = db.collection('projects').doc(this.props.number); //REFERENCE THE CURRENTLY LOGGED IN USER
    //docRef.delete();
    var currentProjUsers = [];
    db.runTransaction(t=>{
      return t.get(projRef).then(doc=>{
        currentProjUsers = doc.data().projectUsers;
        var updatedProjUsers = currentProjUsers.filter(user=> user!==this.props.currentUserDisplayName);
        //var updatedProjUsers = currentProjUsers;
        t.update(projRef, {projectUsers: updatedProjUsers});
      });
    }).then(result=>{
      console.log(result, 'Transaction success!');
      //this.getCurrentProjectsInFirebase();
      this.props.getCurrentProjectsInFirebase();
    }).catch(err=>{
      console.log(err);
    });      

  }  
  handleArchiveNote=(e)=>{
    var db = firebase.firestore();
    var projRef = db.collection('archivedNotes').doc(this.props.currentUserDisplayName);    
    var projNumber = this.props.number;
    var noteText = e.target.parentNode.childNodes[0].innerHTML; //THE <li> ITEM SHOULD BE INDEX 0.
    console.log(noteText);
    db.runTransaction(t=>{
      return t.get(projRef).then(doc=>{
        var arrayofArchivedNotesForThisProject = [];
        if(doc.data()[projNumber] !== undefined){
          arrayofArchivedNotesForThisProject = doc.data()[projNumber];
          arrayofArchivedNotesForThisProject.push(noteText);
          t.update(projRef, {[projNumber]: arrayofArchivedNotesForThisProject});
        }
        else{
          arrayofArchivedNotesForThisProject.push(noteText);
          t.update(projRef, {[projNumber]: arrayofArchivedNotesForThisProject});
        }
        
      });
    }).then(result=>{
      //this.handleDeleteNote();
      console.log(result, 'Transaction success!');
      //this.getCurrentProjectsInFirebase();
      //this.props.getCurrentProjectsInFirebase();
    }).catch(err=>{
      console.log(err);
    });      
    
    var newArr = [];
    var notesRef = db.collection('notes').doc(this.props.currentUserDisplayName);
    var bindedThis = this;
    bindedThis.currentNotes=[];
    db.runTransaction(t=>{
      return t.get(notesRef).then(doc=>{
        if(doc.data()[this.props.number]!==undefined){
          bindedThis.currentNotes = doc.data()[this.props.number];
          newArr = bindedThis.currentNotes.filter(function(x){
            return x !== noteText;
          });
          t.update(notesRef, {[this.props.number]: newArr});
        }
      });
    }).then(result=>{
      console.log('Transaction success! ', newArr);
      this.setState({notesForThisUserAndThisProject: newArr});
    }).catch(err=>{
      console.log(err);
    });
  }
  handleSubmitNote=(e)=>{
    var newNoteTextValue = document.getElementById('addNoteInput' + this.props.number).value;
    var db = firebase.firestore();
    var projRef = db.collection('notes').doc(this.props.currentUserDisplayName);
    var bindedThis = this;
    bindedThis.currentNotes=[];
    db.runTransaction(t=>{
      return t.get(projRef).then(doc=>{
        if(doc.data()[this.props.number]!==undefined){
          bindedThis.currentNotes = doc.data()[this.props.number];
          bindedThis.currentNotes.push(newNoteTextValue);
          //var updatedProjUsers = currentProjUsers;
          t.update(projRef, {[this.props.number]: bindedThis.currentNotes});
        }else{
          console.log("good");
          bindedThis.currentNotes.push(newNoteTextValue);
          //var updatedProjUsers = currentProjUsers;
          t.update(projRef, {[this.props.number]: bindedThis.currentNotes});
        }
        
      });
    }).then(result=>{
      console.log('Transaction success!');
      this.projectCancelAddNote();
      this.setState({notesForThisUserAndThisProject: bindedThis.currentNotes}); //NEED THIS TO UPDATE THIS ProjectCard COMPONENT
      this.props.getCurrentNotesForCurrentUser(); //NEED THIS TO UPDATE App COMPONENT, SINCE IT IS UPDATED ONLY ON componentWillMount
    }).catch(err=>{
      console.log(err);
    });
    
    
  }
  handleDeleteNote=(e)=>{
    var liClass = document.getElementsByClassName('listItems' + [this.props.number]);
    var index = e.target.id;
    var noteIndex = index[0];
    var note = liClass[noteIndex].innerHTML; // ACTUAL NOTE
    var newArr = [];
    var db = firebase.firestore();
    var projRef = db.collection('notes').doc(this.props.currentUserDisplayName);
    var bindedThis = this;
    bindedThis.currentNotes=[];
    db.runTransaction(t=>{
      return t.get(projRef).then(doc=>{
        if(doc.data()[this.props.number]!==undefined){
          bindedThis.currentNotes = doc.data()[this.props.number];
          newArr = bindedThis.currentNotes.filter(function(x){
            return x !== note;
          });
          t.update(projRef, {[this.props.number]: newArr});
        }
      });
    }).then(result=>{
      console.log('Transaction success! ', newArr);
      this.setState({notesForThisUserAndThisProject: newArr});
    }).catch(err=>{
      console.log(err);
    });
  }
  showAddNoteInput=(e)=>{    
    document.getElementById("projectAddNoteInputDiv" + this.props.number).style.visibility = 'visible';
    this.props.shortcutListener();
    var noteInputEL = document.getElementById("addNoteInput" + this.props.number);
    noteInputEL.focus(); 
  }
  projectCancelAddNote=(e)=>{
    document.getElementById("projectAddNoteInputDiv" + this.props.number).style.visibility = 'hidden';
    this.props.shortcutListenerOn();
  }
  componentWillMount=(e)=>{
    for(var n=0; n<=this.state.notes.length-1; n++){
      var user = Object.keys(this.state.notes[n])[0];
      if(user===this.props.currentUserDisplayName){
        //console.log(Object.values(this.state.notes[n]));
        var arrayOfNotes = Object.values(this.state.notes[n]);
        var projectSpecificNotes = arrayOfNotes[0][this.props.number];
      }

    }
    this.setState({notesForThisUser:arrayOfNotes, notesForThisUserAndThisProject: projectSpecificNotes});
  }
  render() {
    var randomKeyItem = Math.random(); //NEED THIS TO AVOID WARNING ON THE CONSOLE (RADIUM DOES NOT LIKE TO KEYS WITH THE SAME NAME)
    this.notes = [];
    if(typeof this.state.notesForThisUserAndThisProject!=='undefined'){
      
        for(var i=0; i<=this.state.notesForThisUserAndThisProject.length-1; i++){
          this.notes.push( <div key={"listItemDiv" + this.state.notesForThisUserAndThisProject[i]} style={styles.projectCardListItemsDiv}><li className={"listItems" + [this.props.number]} id={i + this.state.notesForThisUserAndThisProject[i]} key={"listItem" + this.state.notesForThisUserAndThisProject[i]} style={styles.projectCardListItem}>{this.state.notesForThisUserAndThisProject[i]}</li>
          <button style={styles.projectCardListItemRemoveButton} id={i + 'removeButton'} onClick={this.handleDeleteNote} key={"listItemButton1" + randomKeyItem + this.state.notesForThisUserAndThisProject[i]}>REMOVE</button>
          <button style={styles.projectCardListItemDoneButton} id={'archiveButton' + i} onClick={this.handleArchiveNote} key={"listItemButton2" + randomKeyItem + this.state.notesForThisUserAndThisProject[i]}>ARCHIVE</button>
          </div>)
        }
      }
        
      
    
  
    
    //--------------INPUT TO ENTER NEW NOTE-------------------------  
    var addNoteInput=[];
      addNoteInput.push(<div style={styles.projectAddNoteInputDiv} key="projectAddNoteInputKey" id={"projectAddNoteInputDiv" + this.props.number}>
        <input id={"addNoteInput" + this.props.number} style={styles.projectAddNoteInput} placeholder="Add a new note"></input>
        <button style={styles.projectAddNoteInputCancelButton} onClick={this.projectCancelAddNote} key="projectAddNoteInputCancelButtonKey"> CANCEL </button>
        <button style={styles.projectAddNoteInputSubmitButton} key="projectAddNoteInputSubmitButtonKey" onClick={this.handleSubmitNote}> SUBMIT </button>
      </div>)
    //----------------------------------------------------------------

   
      return (
        <StyleRoot>
        <div id={"ProjectCardTrash_" + this.props.title} key={"ProjectCardKey" + this.props.title} style={styles.ProjectCard}>        
          <p style={styles.projectShortcutNumber}>{this.props.projectPriorityShortcut}</p>
          <p style={styles.projectCardTitle}>{this.props.title}</p>
          <p style={styles.projectCardProjectPlant}>{this.props.number + ' - ' + this.props.plant}</p>
          <p style={styles.projectCardRecentNotesTitle}>Recent notes/to-dos:</p>
          <div style={styles.projectCardListDiv}>
            <ol style={styles.projectCardList}>
              
              {this.notes}
              
            </ol>
              {addNoteInput}
          </div>
          <div style={styles.projectCardIconsDiv} key="iconProjectCardDiv1">
            <p className={this.props.number} style={styles.iconTrashParagraph} key="iconProjectCardParagraph1" onClick={this.deleteCurrentProjectUserFromFirebase}><i className="fas fa-trash" style={styles.icon} key="iconProjectCardI1" ></i></p>
            <p className={this.props.number} style={styles.iconAddnoteParagraph} key="iconProjectCardParagraph2" onClick={this.showAddNoteInput/*props.toNewNote*/}><i className="fas fa-sticky-note" style={styles.icon} key="iconProjectCardI2" ></i></p>
            <p className={this.props.number} style={styles.iconMaximizeProjectParagraph} key="iconProjectCardParagraph3" onClick={this.props.toProjectOverview}><i className="fas fa-expand-arrows-alt" style={styles.icon} key="iconProjectCardI3" ></i></p>
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
      
      borderRadius:10,
      border:'solid transparent 4px',
      ':hover':{
        border:'solid white 4px'
      },
      '@media (max-width: 430px)': {        
        width:'100%',
        height:'80%'
      }
    },
    projectShortcutNumber:{
      color:'white', 
      fontFamily:'Gugi',
      fontSize:26,
      '@media (max-width: 430px)': {             
        fontSize:12, 
      }
    },
    projectCardTitle:{
      color:'white', 
      fontFamily:'Gugi',
      marginBottom:0,
      '@media (max-width: 430px)': {             
        fontSize:12, 
      }
    },
    projectCardProjectPlant:{
      color:'white',
      fontFamily:'Gugi',
      marginTop:10,
      '@media (max-width: 430px)': {             
        fontSize:12, 
      } 
    },
    projectCardRecentNotesTitle:{
      color:'white',
      fontFamily:'Montserrat',
      marginTop:22, 
      textDecoration:'underline',
      '@media (max-width: 430px)': {             
        marginTop:6, 
        fontSize:12
      }
    },
    projectAddNoteInputDiv:{
      width:'100%',
      visibility:'hidden'
    },
    projectAddNoteInput:{
      textAlign:'center',
      backgroundColor:'transparent',
      borderTop:'none',
      borderLeft:'none',
      borderRight:'none',
      borderRadius:3,
      color:'white',
      width:'60%',
      marginBottom:50,
      marginRight:20
    },
    projectAddNoteInputCancelButton:{
      backgroundColor:'darkred',
      color:'white',
      height:20,
      borderTop:'none',
      borderLeft:'none',
      borderRight:'none',
      borderBottom:'none',
      borderRadius:3,
      marginRight:2,
      ':hover':{
        backgroundColor:'red'
      }
    },
    projectAddNoteInputSubmitButton:{
      backgroundColor:'darkgreen',
      color:'white',
      height:20,
      borderTop:'none',
      borderLeft:'none',
      borderRight:'none',
      borderBottom:'none',
      borderRadius:3,
      marginLeft:2,
      ':hover':{
        backgroundColor:'limegreen'
      }
    },
    projectCardListItemsDiv:{
      display:'flex',
      alignItems:'baseline',
      justifyContent:'center',
      width:'100%',
      height:20
    },
    projectCardListItemsDivEmpty:{
      display:'flex',
      alignItems:'baseline',
      justifyContent:'center',
      width:'100%'
    },
    projectCardListDiv:{
      width:'100%',
      margin:0,
      height:250,
      overflow: 'hidden',
      '@media (max-width: 430px)': {        
        height:100,
      }
    },
    projectCardList:{
      padding:'0 20px 50px 0',
      display:'flex',
      flexWrap:'wrap',
      width:'100%',      
      overflowY: 'auto',
      overflowX: 'hidden',
      boxSizing:'content-box',
      '@media (max-width: 430px)': {        
        
      }
    },
    projectCardListItem:{
      color:'white',
      fontFamily:'Montserrat',
      fontSize:14,
      width:'50%',
      textAlign:'left',
      marginLeft:10,
      ':hover':{
        color:'orange'
      },
      '@media (max-width: 430px)': {        
        width:'200px',
        fontSize:10,
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
      },
      '@media (max-width: 430px)': {        
        minWidth:'2%',
        fontSize:8,
        marginLeft:2,
        marginRight:2,
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
      },
      '@media (max-width: 430px)': {        
        minWidth:'2%',
        fontSize:8,
        marginLeft:2,
        marginRight:2
      }
    },
    projectCardIconsDiv:{
      display:'flex',
      justifyContent:'center',
      height:60,
      '@media (max-width: 430px)': {             
        marginTop:50,
      }
    },
    icon:{
      fontSize:40,      
      width:'100%',
      '@media (max-width: 430px)': {             
        fontSize:20,
      }
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