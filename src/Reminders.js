import React, { Component } from 'react';
import {StyleRoot} from 'radium';

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