import React, { Component } from 'react';
//import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class QuickUpdate extends Component{
    handleBackClick=(e)=>{
        this.props.handleBackFromQuickUpdate();
    }
    handleSubmitClick=(e)=>{
        console.log(document.getElementById('quickUpdateSelect').value);
        var db = firebase.firestore();
        
        
    }
	render(){
		return(
			<StyleRoot>
				<div className="QuickUpdate">
                    <div className="quickUpdateInputsContainer" style={styles.quickUpdateInputsContainer}>
                        <div className="quickUpdateTitleDiv" style={styles.quickUpdateTitleDiv}>
                            <p className="quickUpdateTitle" style={styles.quickUpdateTitle}>QUICK UPDATE</p>
                        </div>
                        <div className="quickUpdateInputsDiv" style={styles.quickUpdateInputsDiv}>
                            <input className="quickUpdateInputs" key="quickUpdateInputsKey1" id="quickUpdateTitleInput" style={styles.quickUpdateInputs} placeholder="Enter a title here (optional)" ></input>
                            <input className="quickUpdateInputs" key="quickUpdateInputsKey2" id="quickUpdateDescriptionInput" style={styles.quickUpdateInputs} placeholder="Enter what you'd like to update here" ></input>
                            <input className="quickUpdateInputs" key="quickUpdateInputsKey3" id="quickUpdateComponentInput" style={styles.quickUpdateInputs} placeholder="Any component(s) you need to add/remove/change here (optional)?" ></input>
                        </div>
                        <div className="quickUpdateSelectDiv" style={styles.quickUpdateSelectDiv}>
                            <label className="quickUpdateSelectLabel" style={styles.quickUpdateSelectLabel}>Drawing package<span className="requiredSpan" style={styles.requiredSpan}> (required)</span> <span className="colonSpan" style={styles.colonSpan}> :</span></label>
                            <select className="quickUpdateSelect" id="quickUpdateSelect" style={styles.quickUpdateSelect}>
                                <option className="quickUpdateOption1" key="quickUpdateOption1Key" value="Electrical">Electrical</option>
                                <option className="quickUpdateOption2" key="quickUpdateOption2Key" value="Pneumatic">Pneumatic</option>
                                <option className="quickUpdateOption3" key="quickUpdateOption3Key" value="Mechanical">Mechanical</option>
                            </select>
                        </div>
                    </div>

                    <div className="quickUpdateButtonsDiv" style={styles.quickUpdateButtonsDiv}>
                        <button className="quickUpdateButtonSubmit" key="shopButtonSubmit" style={styles.quickUpdateButtonSubmit} onClick={this.handleSubmitClick}>SUBMIT</button>
                        <button className="quickUpdateButtonCancel" key="shopButtonCancel" style={styles.quickUpdateButtonCancel} onClick={this.handleBackClick}>BACK</button>
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default QuickUpdate;

const styles={
    quickUpdateTitleDiv:{
        width:'100%',
		textAlign:'center',
		margin:'0 0 0 0'
    },
    quickUpdateTitle:{
        fontFamily:'Pathway Gothic One',
        color:'white',
        fontSize:32,
        
    },
    quickUpdateInputsContainer:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:60
    },
    quickUpdateInputsDiv:{
        marginTop:0,
    },
    quickUpdateInputs:{
        fontFamily:'Pathway Gothic One',
        width:'100%',
        height:30,
        color:'white',
        textAlign:'center',
        justifyContent:'center',
        backgroundColor:'transparent',
        borderTop:'none',
        borderRight:'none',
        borderLeft:'none',
        borderBottom:'solid white 1px',
        borderRadius:6,
        marginTop:40,
        fontSize:20
    },
    quickUpdateSelectDiv:{
        display:'flex',
        justifyContent:'center',
        textAlign:'baseline',
        width:'100%',
        margin:'80px 0 20px 0',
    },
    quickUpdateSelectLabel:{
        fontFamily:'Pathway Gothic One',
        color:'white',
        fontSize:24,
        width:'50%',        
    },
    requiredSpan:{
        fontFamily:'Pathway Gothic One',
        color:'red',
        fontSize:16,
	},
	colonSpan:{
		fontFamily:'Pathway Gothic One',
        color:'white',
        fontSize:24,
	},
    quickUpdateSelect:{
        width:'40%',
        textAlign:'center',
        background:'white',
        color:'purple',
        borderStyle:'solid',
        borderColor:'white',
        borderRadius:'5px',
        fontFamily:'Pathway Gothic One',
        fontSize:22
    },
    quickUpdateButtonsDiv:{
        display:'flex',
        justifyContent:'center',
        
    },
    quickUpdateButtonCancel:{
        height:40,
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
    quickUpdateButtonSubmit:{
        height:40,
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
        },
    }

}