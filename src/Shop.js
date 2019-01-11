import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

const firebase = require("firebase");

class Shop extends Component{
    constructor(props){
        super(props);
        this.state={
          projects:[],
        }        
        this.getCurrentProjectsInFirebase();
      }
    getCurrentProjectsInFirebase=(e)=>{
        var db=firebase.firestore();
        var projects =[];
        var projectsInFirebaseRef = db.collection('projects');
        projectsInFirebaseRef.get().then((snapshot)=>{
          snapshot.forEach(doc=>{
            projects.push(doc.data());
          })
          this.setState({projects:projects})
        })
    }
    handleBackClick=(e)=>{
        this.props.handleBackFromShop();
    }
    toQuickUpdatesShop=(e)=>{
        this.props.toQuickUpdate();
    }
    toDesignCheckShop=(e)=>{
        this.props.toDesignCheck();
    }
    toReturnPart=(e)=>{
        this.props.toReturnPart();
    }
    componentDidUpdate=(e)=>{
        
        console.log(this.state.projects);
    }
	render(){
        
		return(
			<StyleRoot className="StyleRoot" style={styles.StyleRoot}>
				<div className="Shop" style={styles.Shop}>
                    <div className="shopTitleDiv" style={styles.shopTitleDiv}>
                        <p className="shopTitle" style={styles.shopTitle}>What would you like to do?</p>
                        <div className="shopActionButtonsDiv" style={styles.shopActionButtonsDiv}>
                            <button className="shopButtonsQuickUpdate" key="shopButtonsQuickUpdate" style={styles.shopActionButton} onClick={this.toQuickUpdatesShop}>QUICK UPDATE</button>
                            <button className="shopButtonsDesignCheck" key="shopButtonsDesignCheck" style={styles.shopActionButton} onClick={this.toDesignCheckShop}>DESIGN CHECK</button>
                            <button className="shopButtonsDrawingDate" key="shopButtonsDrawingDate" style={styles.shopActionButton}>LATEST DRAWING CHECK</button>
                            <button className="shopButtonsPartOrderStatus" key="shopButtonsPartOrderStatus" style={styles.shopActionButton}>PART ORDER STATUS</button>                            
                            <button className="shopButtonsCheckInParts" key="shopButtonsCheckInParts" style={styles.shopActionButton}>CHECK IN PART(S)</button>
                            <button className="shopButtonsReturnParts" key="shopButtonsReturnParts" style={styles.shopActionButton} onClick={this.toReturnPart}>RETURN PART(S)</button>
                        </div>
                    </div>
                    <div className="shopButtonsDiv" style={styles.shopButtonsDiv}>
                        <button className="shopButtonCancel" key="shopButtonCancel" style={styles.shopButtonCancel} onClick={this.handleBackClick}>BACK</button>
                    </div>
                </div>
			</StyleRoot>
		)
	}
}

export default Shop;

const styles={
    StyleRoot:{
        width:'100%'
    },
    Shop:{
        width:'100%'
    },
    shopTitleDiv:{
        margin:'0px 0px 100px 0px',
        
    },
    shopTitle:{
        fontFamily:'Fjalla One',
        color:'white',
        fontSize:28,
        margin:'40px 0 40px 0',
        
    },
    shopActionButtonsDiv:{
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'wrap',
        padding:'0 150px 0 150px'
    },
    shopActionButton:{
        margin:'20px 20px 20px 20px',
        padding:'0 50px 0 50px',
        fontFamily:'Pathway Gothic One',
        fontSize:24,
        height:80,
        width:300,
        borderTop:'none',
        borderBottom:'none',
        borderRight:'none',
        borderLeft:'none',
        borderRadius:10,
        backgroundColor:'purple',
        color:'white',
        ':hover':{
            backgroundColor:'orange',
            color:'white'
        },
        ':active':{
            backgroundColor:'yellow',
            color:'purple'
        }
    },
    shopButtonsDiv:{
        display:'flex',
        justifyContent:'center'
    },
    shopButtonCancel:{
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