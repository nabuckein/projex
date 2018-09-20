import React, { Component } from 'react';
import {StyleRoot} from 'radium';


class ProjectsList extends Component{

	render(){
		return(
			<StyleRoot>
				<div className="ProjectsList">
                    <div className="settingsProjectPriorityDiv" style={styles.settingsProjectsDiv}>
                        <p className="settingsProjectPriorityTitle" style={styles.settingsProjectPriorityTitle}>Set your projects' priority:</p>
                        {this.props.projects}
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default ProjectsList;

const styles={
    settingsProjectPriorityTitle:{
        fontFamily:'Gugi',
        color:'white'
    },
}