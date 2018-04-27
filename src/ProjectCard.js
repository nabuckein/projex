import React, { Component } from 'react';

class ProjectCard extends Component {
  render() {
    return (
      <div className="ProjectCard" style={styles.ProjectCard}>
        
        <h1 style={styles.projectCardTitle}>Project's Title</h1>
        <h2 style={styles.projectCardProjectNumber}>Project Number</h2>
          <ol style={styles.projectCardList}>
            <li style={styles.projectCardProjectNumber}></li>
            <li style={styles.projectCardProjectNumber}></li>
          </ol>
      </div>
    )
  }
}

export default ProjectCard;

const styles = {
    ProjectCard:{
      backgroundColor:'gray',
      width:'40%',
      marginLeft:'auto',
      marginRight:'auto',
      borderRadius:10
    },
    projectCardTitle:{
      color:'white', 
      fontFamily:'Acme'
    },
    projectCardProjectNumber:{
      color:'white',
      fontFamily:'Acme'        
    },
    projectCardList:{
      paddingBottom:50
    },
    projectCardItem:{
      color:'white',
      fontFamily:'Acme'
    }

}