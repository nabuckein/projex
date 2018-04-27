import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class AddProjectCard extends Component{

	render(){
		return(
			<StyleRoot>
				<div className="AddProjectCard" style={styles.AddProjectCard}>
                    <p style={styles.icon} onClick={this.props.toNewProjectCardInfo}><i className="fas fa-plus-square"></i></p>
				</div>
			</StyleRoot>
		)
	}
}

export default AddProjectCard;

const styles={
    AddProjectCard:{
        
    },
    icon:{
        fontSize:80,
        color:'gray',
        ':hover':{
            color:'limegreen'
        },
        ':active':{
            color:'white'
        }

    }
}