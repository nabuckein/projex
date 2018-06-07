import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class Reminders extends Component{

	render(){
		return(
			<StyleRoot>
				<div className="Reminders">
                    <h1 style={styles.mainTitle}>Daily notes/reminders:</h1>
				</div>
			</StyleRoot>
		)
	}
}

export default Reminders;

const styles={
    Reminders:{

    },
    mainTitle:{
        fontFamily:'Gugi',
        fontSize:25,
        color:'white'
    }
}