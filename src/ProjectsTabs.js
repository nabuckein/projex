import React, { Component } from 'react';
import {StyleRoot} from 'radium';


class ProjectsTabs extends Component{

	render(){
		return(
			<StyleRoot>
				<div className="ProjectsTabs">
                    <p style={styles.projectTabTitleP}>{this.props.title + " - " + this.props.plant + " - " + this.props.number}</p>
				</div>
			</StyleRoot>
		)
	}
}

export default ProjectsTabs;

const styles={
	ProjectsTabs:{
        textAlign:'center'
    },
    projectTabTitleP:{
        color:'white',
        height:40,
        width:'100%',
        fontSize:14,
        fontFamily:'Gugi',
        border:'solid white 1px',
        marginTop:5,
        marginBottom:5,
        ':hover':{
            backgroundColor:'blue'
        }
    }
}