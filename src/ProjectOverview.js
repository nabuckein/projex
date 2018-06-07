import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class ProjectOverview extends Component{
    constructor(props){
        super(props);
        this.state={
            showAddRow:false,
            tableRowArray:[]
        }
        
      }
    handleAddRowClick=(e)=>{
        this.setState({showAddRow:true});
    }
  
	render(){
        if(this.state.showAddRow){
        var addRow = <tr style={styles.projectOverviewAddRow} key="keyRow3">
        <td>+</td>
        <td style={styles.projectOverviewDescriptionCol}><input style={styles.projectOverviewAddNewNoteInput} placeholder="Max 150 characters"></input></td>
        <td style={styles.projectOverviewStatusCol}></td>
        <td style={styles.projectOverviewCommentCol}></td>
        <td style={styles.projectOverviewDateCol}>Date</td>
        <td style={styles.projectOverviewSubmitButtonCol}>
            <button style={styles.projectOverviewSubmitButton} key="projectOverviewAddNoteSubmitButton">SUBMIT</button>
            <button style={styles.projectOverviewCancelButton} key="projectOverviewAddNoteCancelButton">CANCEL</button>
        </td>
        </tr>;
        }
		return(
			<StyleRoot>
				<div className="ProjectOverview" style={styles.ProjectOverview}>                  
                        
                        <div style={styles.projectOverviewContainerDiv}>
                            <div style={styles.projectOverviewTableDiv}>
                                <table style={styles.projectOverviewTable}>
                                    <caption style={styles.projectOverviewOpenItemsCaption}>List of open items</caption>
                                    <thead>
                                        <tr style={styles.projectOverviewTableHeaders}>
                                            <th style={styles.projectOverviewNumberCol}>#</th>
                                            <th style={styles.projectOverviewDescriptionCol}>Description</th>
                                            <th style={styles.projectOverviewStatusCol}>Status</th>
                                            <th style={styles.projectOverviewCommentCol}>Comment</th>
                                            <th style={styles.projectOverviewDateCol}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody style={styles.projectOverviewTableBody}>
                                        <tr style={styles.projectOverviewTableFields} key="keyRow1">
                                            <td style={styles.projectOverviewNumberCol}>1</td>
                                            <td style={styles.projectOverviewDescriptionCol}>Trying a description</td>
                                            <td style={styles.projectOverviewStatusCol}>Complete</td>
                                            <td style={styles.projectOverviewCommentCol}>Probing a comment</td>
                                            <td style={styles.projectOverviewDateCol}>Date</td>
                                            <td style={styles.projectOverviewRemoveButtonCol}><button style={styles.projectOverviewRemoveButton} key="projectOverviewRemoveNoteButton1">REMOVE</button></td>
                                        </tr>
                                        <tr style={styles.projectOverviewTableFields} key="keyRow2">
                                            <td style={styles.projectOverviewNumberCol}>2</td>
                                            <td style={styles.projectOverviewDescriptionCol}>Trying a description</td>
                                            <td style={styles.projectOverviewStatusCol}>In Progress</td>
                                            <td style={styles.projectOverviewCommentCol}>Probing a comment</td>
                                            <td style={styles.projectOverviewDateCol}>Date</td>
                                            <td style={styles.projectOverviewRemoveButtonCol}><button style={styles.projectOverviewRemoveButton} key="projectOverviewRemoveNoteButton2">REMOVE</button></td>
                                        </tr>
                                        {addRow}
                                    </tbody>
                                </table>
                            </div>
                            {/*<div style={styles.projectOverviewListDiv}>
                                <div style={styles.projectOverviewSecondaryTitlesDiv}>
                                    <p style={styles.projectOverviewSecondaryTitles}>History</p>
                                </div>
                                <ol style={styles.projectOverviewList}>
                                    <div style={styles.projectOverviewListItemsDiv}>
                                        <li key="listItem1" style={styles.projectOverviewListItem}>Send part # to Ian.</li>
                                        <button style={styles.projectOverviewListItemRemoveButton} key="listItemButton1">REMOVE</button>
                                        <button style={styles.projectOverviewListItemDoneButton} key="listItemButton2">ARCHIVE</button>
                                    </div> 
                                </ol>
                            </div>
                            */}

                        </div>
                    <div style={styles.projectOverviewButtonsDiv}>
                        <button onClick={this.handleAddRowClick} style={styles.projectOverviewButtons} key="addRowButtonKey">ADD A NOTE/TO-DO</button>
                        <button onClick={this.props.backToProjects} style={styles.projectOverviewButtons} key="backButtonKey">BACK</button>
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default ProjectOverview;

const styles={
    ProjectOverview:{
        width:'100%',
        margin:0,
        padding:0
    },
    
    projectOverviewContainerDiv:{
        
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        marginBottom:100,
        marginLeft:10
    },
    projectOverviewListDiv:{
        width:'30%',        
        margin:0
    },
    projectOverviewTableDiv:{
        width:'95%',        
        height:250
    },
    projectOverviewTable:{
        width:'100%',
        borderCollapse:'collapse',
        
    },
    projectOverviewOpenItemsCaption:{
        color:'purple',
        backgroundColor:'white',
        fontFamily:'Gugi',
        fontSize:20,
        widht:'80%',
        paddingTop:20,
        paddingBottom:20
    },
    projectOverviewTableHeaders:{
        color:'white',
        fontFamily:'Gugi',
        height:60,
        border:'solid white 1px'

    },
    projectOverviewTableBody:{
        border:'solid white 1px'
    },
    projectOverviewTableFields:{
        color:'white',
        fontFamily:'Montserrat',
        fontSize:14,
        height:40,
        border:'solid white 1px',
        ':hover':{
            backgroundColor:'purple'
        }
    },
    projectOverviewNumberCol:{
        width:'5%',
        border:'solid white 1px'

    },
    projectOverviewDescriptionCol:{
        width:'35%',
        border:'solid white 1px'

    },
    projectOverviewStatusCol:{
        width:'10%',
        border:'solid white 1px'

    },
    projectOverviewCommentCol:{
        width:'35%',
        border:'solid white 1px'

    },
    projectOverviewDateCol:{
        width:'5%',
        border:'solid white 1px'
    },
    projectOverviewAddNewNoteInput:{
        width:'90%',
        backgroundColor:'purple',
        color:'white',
        border:'none'
    },
    projectOverviewSubmitButton:{
        border:'none',
        backgroundColor:'darkgreen',
        color:'white',
        ':hover':{
            backgroundColor:'green',
        }
    },
    projectOverviewCancelButton:{
        border:'none',
        backgroundColor:'darkorange',
        color:'white',
        ':hover':{
            backgroundColor:'orange',
        }
    },
    projectOverviewRemoveButton:{
        border:'none',
        backgroundColor:'darkred',
        color:'white',
        ':hover':{
            backgroundColor:'red',
        }
    },
    projectOverviewSubmitButtonCol:{
        width:'10%',
    },
    projectOverviewRemoveButtonCol:{
        
    },
    projectOverviewAddRow:{
        
        backgroundColor:'purple',
        color:'white',
        fontFamily:'Montserrat',
        height:50
    },
    projectOverviewAddCol:{
        width:'80%',
        
    },
    projectOverviewSecondaryTitlesDiv:{
        
    },
    projectOverviewSecondaryTitles:{
        color:'white',
        fontFamily:'Gugi'
    },
    projectOverviewList:{
        padding:0
    },
    projectOverviewButtons:{
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