import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

class Loading extends Component{

	render(){
		return(
			<StyleRoot>
				<div className="Loading" style={styles.Loading}>
                    <p style={styles.loadingTitle}>Loading, please wait...</p>
                    <div style={styles.loadingCircle}></div>
				</div>
			</StyleRoot>
		)
	}
}

export default Loading;
var spin = Radium.keyframes({
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(720deg)'},
  }, 'pulse');
        

var styles={
    Loading:{
        width:'100%',
        
    },
    loadingTitle:{
        color:'white',
        fontFamily:'Gugi',
        fontSize:30,
        marginTop:'20%'
    },
    loadingCircle:{
        
        marginLeft:'auto',
        marginRight:'auto',
        borderStyle:'solid',
        borderColor:'white',
        borderWidth:'10px',
        height:100,
        width:100,
        borderRadius:'50%',
        borderTopColor:'gray',
        borderBottomColor:'white',
        animationDuration: '1s',        
        animationIterationCount:'infinite',
        animationName:spin
    }
}