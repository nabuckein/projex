import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class DesignCheck extends Component{
    constructor(props){
        super(props);
        this.state={
          buttonSelectedStatus: false,
          buttonSelectName:'none',
          
        }
        this.projects = [];
        this.projectsTabs=[];
      }
	handleBackClick=(e)=>{
        this.props.handleBackFromDesignCheck();
    }
    handleSelectButtonClick=(e)=>{
        var selectedButton = e.target.id;
        var drawingPackage = document.getElementById(selectedButton).innerHTML;
        console.log(drawingPackage);
        this.setState({buttonSelectName:drawingPackage});
    }
    handleSelectButtonElectricalHover=(e)=>{
        console.log("Electrical Button Hovered");
        document.getElementById('selectButtonElectrical').style.backgroundColor = 'darkred';
        document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
        document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';
    }
    handleSelectButtonPneumaticHover=(e)=>{
        console.log("Pneumatic Button Hovered");
        document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
        document.getElementById('selectButtonPneumatic').style.backgroundColor = 'darkblue';
        document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';
    }
    handleSelectButtonMechanicalHover=(e)=>{
        console.log("Mechanical Button Hovered");
        document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
        document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
        document.getElementById('selectButtonMechanical').style.backgroundColor = 'green';
    }
    handleButtonMouseLeave=(e)=>{
        if(this.state.buttonSelectName==='none'){
            document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
            document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
            document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';
        }
        else if(this.state.buttonSelectName==='Electrical'){
            document.getElementById('selectButtonElectrical').style.backgroundColor = 'red';
            document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
            document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';
        }
        else if(this.state.buttonSelectName==='Pneumatic'){
            document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
            document.getElementById('selectButtonPneumatic').style.backgroundColor = 'blue';
            document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';  
        }
        else if(this.state.buttonSelectName==='Mechanical'){
            document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
            document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
            document.getElementById('selectButtonMechanical').style.backgroundColor = 'limegreen';
        }
    }
    getButtonsStyle=(e)=>{
        
        switch(this.state.buttonSelectName){
            case 'Electrical':
                console.log("Electrical Selected");
                document.getElementById('selectButtonElectrical').style.backgroundColor = 'red';
                document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
                document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';
                break;
            case 'Pneumatic':
                console.log("Pneumatic Selected");
                document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
                document.getElementById('selectButtonPneumatic').style.backgroundColor = 'blue';
                document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';
                break;            
            case 'Mechanical':
                console.log("Mechanical Selected");
                document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
                document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
                document.getElementById('selectButtonMechanical').style.backgroundColor = 'limegreen';
                break;                
            default:
                document.getElementById('selectButtonElectrical').style.backgroundColor = 'black';
                document.getElementById('selectButtonPneumatic').style.backgroundColor = 'black';
                document.getElementById('selectButtonMechanical').style.backgroundColor = 'black';
                console.log("No button selected");
                break;
        }
    }
    componentDidUpdate=(e)=>{
        this.getButtonsStyle();
    }
    componentDidMount=(e)=>{
        this.getButtonsStyle();
    }
	render(){
        
		return(
			<StyleRoot>
				<div className="DesignCheck">
					<div className="designCheckInputsContainer" style={styles.designCheckInputsContainer}>
						<div className="designCheckTitleDiv" style={styles.designCheckTitleDiv}>
							<p className="designCheckTitle" style={styles.designCheckTitle}>DESIGN CHECK</p>
						</div>
                        <div className="designCheckSelectDiv" style={styles.designCheckSelectDiv}>
                            <label className="designCheckSelectLabel" style={styles.designCheckSelectLabel}>Drawing package<span className="requiredSpan" style={styles.requiredSpan}> (required)</span> <span className="colonSpan" style={styles.colonSpan}> :</span></label>
                            {/*<select className="designCheckSelect" id="designCheckSelect" style={styles.designCheckSelect}>
                                <option className="designCheckOption1" key="designCheckOption1Key" value="Electrical">Electrical</option>
                                <option className="designCheckOption2" key="designCheckOption2Key" value="Pneumatic">Pneumatic</option>
                                <option className="designCheckOption3" key="designCheckOption3Key" value="Mechanical">Mechanical</option>
                            </select>*/}
                            <div className="designCheckSelectButtonsDiv" id="designCheckSelect" style={styles.designCheckSelectButtonsDiv} key="designCheckSelectButtonDiv">
                                <button className="designCheckSelectButtons" id='selectButtonElectrical' style={styles.designCheckSelectButtonsElectrical} key="designCheckSelectButtonElectrical" onMouseOver={this.handleSelectButtonElectricalHover} onMouseLeave={this.handleButtonMouseLeave} onClick={this.handleSelectButtonClick}>Electrical</button>
                                <button className="designCheckSelectButtons" id='selectButtonPneumatic' style={styles.designCheckSelectButtonsPneumatic} key="designCheckSelectButtonPneumatic" onMouseOver={this.handleSelectButtonPneumaticHover} onMouseLeave={this.handleButtonMouseLeave} onClick={this.handleSelectButtonClick}>Pneumatic</button>
                                <button className="designCheckSelectButtons" id='selectButtonMechanical' style={styles.designCheckSelectButtonsMechanical} key="designCheckSelectButtonMechanical" onMouseOver={this.handleSelectButtonMechanicalHover} onMouseLeave={this.handleButtonMouseLeave} onClick={this.handleSelectButtonClick}>Mechanical</button>
                            </div>
                        </div>
						<div className="designCheckDescriptionDiv" style={styles.designCheckDescriptionDiv}>
							<label className="designCheckDescriptionLabel" style={styles.designCheckDescriptionLabel}>What would you like to check?</label>
                        	<input className="designCheckInputs" key="designCheckInputsKey1" id="designCheckDescriptionInput" style={styles.designCheckDescriptionInput} placeholder="Enter a BRIEF description here (optional)" ></input>
                        </div>
                        {/*
						<div className="designCheckORDiv" style={styles.designCheckORDiv}>
							<p className="designCheckOR" style={styles.designCheckOR}>OR</p>
						</div>
						<div className="designCheckSelectDiv" style={styles.designCheckSelectDiv}>
                            <label className="designCheckSelectLabel" style={styles.designCheckSelectLabel}>Select a common issue:</label>
                            <select className="designCheckSelect" id="designCheckSelect" style={styles.designCheckSelect}>
                                <option className="designCheckOption1" key="designCheckOption1Key" value="Electrical">Wrong amperage/voltage</option>
                                <option className="designCheckOption2" key="designCheckOption2Key" value="Pneumatic">Obsolete/wrong part #</option>
                                <option className="designCheckOption3" key="designCheckOption3Key" value="Mechanical">Drawing not up to date</option>
                            </select>
                        </div>
						<div className="designCheckDescriptionDiv" style={styles.designCheckDescriptionDiv}>
							<label className="designCheckSheetNumberLabel" style={styles.designCheckDescriptionLabel}>Sheet number:</label>
                        	<input className="designCheckInputs" key="designCheckInputsKey1" id="designCheckSheetNumberInput" style={styles.designCheckSheetNumberInput} placeholder="Enter one or more sheet(s) here"></input>
                        </div>
                        */}
                    </div>

					<div className="designCheckButtonsDiv" style={styles.designCheckButtonsDiv}>
                    	<button className="designCheckButtonSubmit" key="designCheckButtonSubmit" style={styles.designCheckButtonSubmit} >SUBMIT</button>
                    	<button className="designCheckButtonCancel" key="designCheckButtonCancel" style={styles.designCheckButtonCancel} onClick={this.handleBackClick}>BACK</button>
                	</div>
				
				</div>
			</StyleRoot>
		)
	}
}

export default DesignCheck;

const styles={
	
	designCheckTitleDiv:{
		width:'100%',
		textAlign:'center',
		margin:'0 0 40px 0'
	},
	designCheckTitle:{
		color:'white',
		fontSize:32,
		fontFamily:'Pathway Gothic One'
	},
    designCheckInputsContainer:{
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        width:'100%',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:60
    },
    designCheckSelectDiv:{
        display:'flex',
        justifyContent:'center',
        textAlign:'baseline',
        width:'100%',
        margin:'0 0 20px 0',
    },
    designCheckSelectButtonsDiv:{
        width:'30%',
        marginLeft:20,
        display:'flex',
        justifyContent:'center',
    },
	designCheckSelectLabel:{
        fontFamily:'Pathway Gothic One',
        color:'white',
        fontSize:24,
        width:'15%',
        marginLeft:120,
    },
    designCheckSelectButtonsElectrical:{
        fontFamily:'Pathway Gothic One',    
        fontSize:20,
        textTransform:'uppercase',
        borderTop:'none',
        borderBottom:'none',
        borderRight:'none',
        borderLeft:'none',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        margin:'0 0 0 0',
        color:'white',
        height:40,
        width:240,   
    },
    designCheckSelectButtonsPneumatic:{
        fontFamily:'Pathway Gothic One',    
        fontSize:20,
        textTransform:'uppercase',
        borderTop:'none',
        borderBottom:'none',
        borderRight:'solid white 1px',
        borderLeft:'solid white 1px',
        margin:'0 0 0 0',
        color:'white',
        height:40,
        width:240,   
    },
    designCheckSelectButtonsMechanical:{
        fontFamily:'Pathway Gothic One',    
        fontSize:20,
        textTransform:'uppercase',
        borderTop:'none',
        borderBottom:'none',
        borderRight:'none',
        borderLeft:'none',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        margin:'0 0 0 0',
        color:'white',
        height:40,
        width:240,   
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
    designCheckSelect:{
        width:'25%',
        margin:'0 50px 0 50px',
        background:'white',
        color:'purple',
        borderStyle:'solid',
        borderColor:'white',
        borderRadius:'5px',
        fontFamily:'Pathway Gothic One',
		fontSize:22,
		textAlign:'center'
    },
    
	designCheckDescriptionDiv:{
		display:'flex',
        justifyContent:'center',
        textAlign:'baseline',
        width:'100%',
		margin:'30px 0 0 0',
	},
	designCheckDescriptionLabel:{
        fontFamily:'Pathway Gothic One',
        color:'white',
        fontSize:24,
        width:'15%',
        margin:'0 0 0 50px'
	},
	designCheckDescriptionInput:{
        fontFamily:'Pathway Gothic One',
        margin:'0 0 0 80px',
        width:'25%',
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
	designCheckORDiv:{
		width:'100%',
		textAlign:'center',
		margin:'0 0 0 0'
	},
    designCheckOR:{
		color:'white',
		fontSize:40,
		fontFamily:'Pathway Gothic One'		
    },
    designCheckSheetNumberLabel:{
        fontFamily:'Pathway Gothic One',
        color:'white',
        fontSize:24,
		width:'15%',
    },
    designCheckSheetNumberInput:{
        fontFamily:'Pathway Gothic One',
        width:'25%',
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
    designCheckButtonsDiv:{
        display:'flex',
        justifyContent:'center',        
    },
    designCheckButtonCancel:{
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
    designCheckButtonSubmit:{
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