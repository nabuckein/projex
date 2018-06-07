import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';


class LoginOrSignup extends Component{

	render(){
		return(
			<StyleRoot>
				<div className="LoginOrSignup" style={styles.LoginOrSignup}>
                    <div style={styles.titlesDiv}>
                        <h1 style={styles.title1}>Baxter</h1>
                        <h3 style={styles.title2}>PROCESS AUTOMATION</h3>
                    </div>
                    <div style={styles.buttonsDiv}>
                        <button key="loginbutton" style={styles.buttons} onClick={this.props.toLogin}>LOG IN</button>
                        <button key="signupbutton" style={styles.buttons} onClick={this.props.toSignup}>SIGN UP</button>
                    </div>
				</div>
			</StyleRoot>
		)
	}
}

export default LoginOrSignup;
var pulseKeyframes = Radium.keyframes({
    '0%': {color: 'white'},
    '50%': {color: 'gray'},
    '100%': {color: 'white'},
  }, 'pulse');

const styles={
    LoginOrSignup:{
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap',
    },
    titlesDiv:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap',
        textAlign:'center',
        marginTop:100,
        marginBottom:100,
    },
    title1:{
        color:'white',
        width:'100%',
        fontFamily:'Pathway Gothic One',
        fontSize:80,
        marginBottom:0
    },
    title2:{
        color:'white',
        width:'100%',
        fontFamily:'Pathway Gothic One',
        fontSize:30,
        animation:'1.5s 0s infinite',
        animationName:pulseKeyframes
    },
    buttonsDiv:{
        width:'100%',
        display:'flex',
        justifyContent:'center'
    },
    buttons:{
        fontFamily:'Pathway Gothic One',        
        color:'white',
        backgroundColor:'purple',
        fontSize:30,
        border:'none',
        marginLeft:10,
        marginRight:10,
        ':hover':{
            backgroundColor:'darkblue'
        },
        ':active':{
            backgroundColor:'white',
            color:'blue'
        }


    }
}