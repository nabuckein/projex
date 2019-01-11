import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class TEMPLATE extends Component{

	render(){
		return(
			<StyleRoot className="StyleRoot" style={styles.StyleRoot}>
				<div className="TemplateMainContainer" style={styles.TemplateMainContainer}>
					<div className="TemplateTitleDiv" style={styles.TemplateTitleDiv}>
						<p className="TemplateTitle" style={styles.TemplateTitle}>Title</p>
					</div>
					<div className="TemplateButtonsDiv" style={styles.TemplateButtonsDiv}>
						<button className="TemplateButtonSubmit" key="TemplateButtonSubmitKey" style={styles.TemplateButtonSubmit} onClick={this.handleSubmitClick}>SUBMIT</button>
						<button className="TemplateButtonCancel" key="TemplateButtonCancelKey" style={styles.TemplateButtonCancel} onClick={this.handleBackClick}>BACK</button>
					</div>
				</div>
			</StyleRoot>
		)
	}
}

export default TEMPLATE;

const styles={
	StyleRoot:{
        width:'100%'
    },
    TemplateMainContainer:{
        width:'100%'
    },
    TemplateTitleDiv:{
        margin:'0px 0px 100px 0px',
        
    },
    TemplateTitle:{
        fontFamily:'Fjalla One',
        color:'white',
        fontSize:28,
        margin:'40px 0 40px 0',        
	},
	TemplateButtonsDiv:{
        display:'flex',
        justifyContent:'center'
    },
    TemplateButtonSubmit:{
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
    },
    TemplateButtonCancel:{
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
    }
}