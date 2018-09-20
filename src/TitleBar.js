import React, { Component } from 'react';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class TitleBar extends Component{
    handleSettingsClick=(e)=>{
        this.props.toSettings();
    }
    handleLogOutClick=(e)=>{ 
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log("%cUSER HAS LOGGED OUT", "background-color:red; color:white");
        }).catch(function(error) {
          // An error happened.
          console.log("%cERROR WHILE TRYING TO LOG OUT", "background-color:red; color:white");
        });
      }
    

	render(){
		return(
			<StyleRoot>
                <div className="titleBarContainer" style={styles.titleBarContainer}>
                    <div style={styles.titleBarDiv}>
                        <h1 style={styles.mainTitle}>Projex</h1>
                        <p style={styles.titleBarButtons}>{this.props.currentUser.displayName}</p>
                        <button key="button1" style={styles.sideBarButtons} onClick={this.handleSettingsClick}>SETTINGS</button>
                        <button key="button2" style={styles.sideBarButtons} onClick={this.handleLogOutClick}>LOG OUT</button>
                    </div>                    
                </div>
			</StyleRoot>
		)
	}
}

export default TitleBar;

const styles={
    titleBarContainer:{
        width:'100%',
        height:100
    },
    titleBarDiv:{
        width:'100%',
        textAlign:'center',
        marginTop:20,
        display:'flex',
        flexWrap:'wrap',
        alignItems:'baseline',
        justifyContent:'center',
        '@media (max-width: 430px)': {
            justifyContent:'center',
        }
        
    },
    mainTitle:{
        color:'white',
        fontFamily: 'Righteous',
        width:'50%',
        margin:0,
        '@media (max-width: 430px)': {
            width:'40%',
            fontSize:24,
            textAlign:'left'
        }
    },
    titleBarButtons:{
        color:'white',
        fontFamily: 'Montserrat',
        width:'30%',
        marginLeft:'2%',
        marginRight:'2%',
        textAlign:'right',
        '@media (max-width: 430px)': {
            fontSize:10,
            width:'25%',
        }
    },
    sideBarButtons:{
        width:'5%',
        height:30,
        backgroundColor:'gray',
        color:'white',
        border:'solid transparent 1px',
        borderRadius:5,
        paddingLeft:0,
        paddingRight:0,
        fontFamily:'Fjalla One',
        fontSize:16,
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
        ':hover':{
          border:'solid black 1px',
          backgroundColor:'#a00',  
          color:'white'    
        },
        ':active':{
          border:'solid red 1px',
          backgroundColor:'black',
          color:'white'
        },    
        '@media (max-width: 430px)': {
            fontSize:10,
            height:20,
            width:40,
            borderRadius:1,
            marginLeft:0,
            marginRight:2,
            
        }
      }
}