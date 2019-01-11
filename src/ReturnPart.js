import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class ReturnPart extends Component{

    handleBackClick=(e)=>{
        this.props.handleBackFromReturnPart();
    }
    handleSubmitClick=(e)=>{
        var manufacturer = document.getElementById('returnPartManufacturerInput').value;
        var partNumber = document.getElementById('returnPartNumberInput').value;
        var reason = document.getElementById('returnPartReasonInput').value;
        console.log(manufacturer, partNumber, reason);
    }

	render(){
		return(
			<StyleRoot>
				<div className="ReturnPart">
                    <div className="returnPartTitleDiv" style={styles.returnPartTitleDiv}>
						<p className="returnPartTitle" style={styles.returnPartTitle}>PART(S) RETURNS</p>
					</div>
                    <div className="returnPartDescriptionDiv" style={styles.returnPartDescriptionDiv}>
                        <div className="returnPartManufacturerDiv" style={styles.returnPartManufacturerDiv}>
						    <label className="returnPartLabel" style={styles.returnPartLabel}>Manufacturer:</label>
                            <input className="returnPartInputs" key="returnPartInputsKey1" id="returnPartManufacturerInput" style={styles.returnPartInput}></input>
                        </div>
                        <div className="returnPartNumberDiv" style={styles.returnPartNumberDiv}>
                            <label className="returnPartLabel" style={styles.returnPartLabel}>Part Number:</label>
                           	<input className="returnPartInputs" key="returnPartInputsKey2" id="returnPartNumberInput" style={styles.returnPartInput}></input>
                        </div>
                        <div className="returnPartReasonDiv" style={styles.returnPartReasonDiv}>
                            <label className="returnPartLabel" style={styles.returnPartLabel}>Reason:</label>
                           	<input className="returnPartInputs" key="returnPartInputsKey4" id="returnPartReasonInput" style={styles.returnPartInput}></input>
                        </div>
                        <div className="returnPartProjectNumberDiv" style={styles.returnPartProjectNumberDiv}>
                            <label className="returnPartLabel" style={styles.returnPartLabel}>ProjectNumber:</label>
                           	<input className="returnPartInputs" key="returnPartInputsKey5" id="returnPartProjectNumberInput" style={styles.returnPartInput}></input>
                        </div>

                    </div>
                    <div className="returnPartButtonsDiv" style={styles.returnPartButtonsDiv}>
                        <button className="returnPartButtonSubmit" key="returnPartButtonSubmit" style={styles.returnPartButtonSubmit} onClick={this.handleSubmitClick}>SUBMIT</button>
                        <button className="returnPartButtonCancel" key="returnPartButtonCancel" style={styles.returnPartButtonCancel} onClick={this.handleBackClick}>BACK</button>
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default ReturnPart;

const styles={
    returnPartTitleDiv:{
		width:'100%',
		textAlign:'center',
		margin:'0 0 40px 0'
	},
	returnPartTitle:{
		color:'white',
		fontSize:32,
		fontFamily:'Pathway Gothic One'
	},
    returnPartDescriptionDiv:{
		display:'flex',
        justifyContent:'center',
        textAlign:'baseline',
        width:'100%',
        flexWrap:'wrap',
		margin:'0 0 60px 0',
    },
    returnPartManufacturerDiv:{
        width:'100%',
        margin:'20px 0 20px 0',
        display:'flex',
        justifiyContent:'center'
    },
    returnPartNumberDiv:{
        width:'100%',
        margin:'20px 0 20px 0',
        display:'flex',
        justifiyContent:'center'
    },
    returnPartReasonDiv:{
        width:'100%',
        margin:'20px 0 20px 0',
        display:'flex',
        justifiyContent:'center'
    },
    returnPartProjectNumberDiv:{
        width:'100%',
        margin:'20px 0 20px 0',
        display:'flex',
        justifiyContent:'center'
    },
	returnPartLabel:{
        fontFamily:'Pathway Gothic One',
        color:'white',
        fontSize:24,
        width:'30%',
        margin:'0 0 0 0',        
	},
	returnPartInput:{
        fontFamily:'Pathway Gothic One',
        margin:'0 0 0 0',
        width:'50%',
        height:30,
        color:'white',
        textAlign:'center',
        backgroundColor:'transparent',
        borderTop:'none',
        borderRight:'none',
        borderLeft:'none',
        borderBottom:'solid white 1px',
        borderRadius:6,
		fontSize:20,
	},
    returnPartButtonsDiv:{
        display:'flex',
        justifyContent:'center'
    },
    returnPartButtonCancel:{
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
    returnPartButtonSubmit:{
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