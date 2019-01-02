import React, { Component } from 'react';
import placeHolder from '../assets/download.jpg';
import whitebg from '../assets/whitebg.png';
import '../App.css';
import PrintComponent from 'react-print-component';
import mergeImages from 'merge-images';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state={
      countDown:this.props.countDown,
      imageCount:this.props.imageCount,
      imageOne:this.props.imageOne,
      imageTwo:this.props.imageTwo,
      imageThree:this.props.imageThree,
      newImage:this.props.newImage

    }
  }

  onPrintButtonClick() {
    //Replace components added
    PrintComponent.SetPrintContent(this.render());
    //Add components to list
    PrintComponent.AddPrintContent(this.render());
    //Clear all added components in list
    PrintComponent.ClearComponent();
    //Call this method to print
    PrintComponent.Print();

    setTimeout(()=>{
      this.setState({
        imageCount:0,
        imageOne:null,
        imageTwo:null,
        imageThree:null
      })
    }, 2000)
    clearInterval(this.photoShoot)
  }

  imageMerge(){
    mergeImages([
      { src: this.state.imageOne === null ? placeHolder : this.state.imageOne, x: 0, y: 0 },
      { src: this.state.imageTwo === null ? placeHolder : this.state.imageTwo, x: 0, y: 110 },
      { src: this.state.imageThree === null ? placeHolder : this.state.imageThree, x: 0, y: 220}
    ], {
      width: 139.2,
      height: 475
    })
    .then(b64 => this.setState({newImage:b64}));
  }

  send(){
    mergeImages([
      { src: whitebg, x: 0, y: 0 },
      { src: this.state.newImage, x: 5, y: 0 },
      { src: this.state.newImage, x: 150, y: 0 }
    ], {
      width: 290,
      height: 475
    })
    .then(b64 => document.querySelector('.test').src = b64);
  }

  render() {
    this.imageMerge()
        return(
            <div>
                <div style={style.buttonWrapper}>
                  <button className="myButton hide" onClick={()=>this.send()}>Send</button>
                  <button className="myButton hide" onClick={()=>this.onPrintButtonClick()}>Print</button>
                </div>
                
                <div style={style.modalContainer}/>
                    <div style={style.modalWrapper}>
                    <img alt='' src={this.state.newImage}/>
                    <img alt='' src={this.state.newImage}/>
                </div>
                <img className="test"/>
            </div>
        )
    }
  }

const style = {
  modalContainer:{
    position:'absolute',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    top:0,
    left:0,
    bottom:0,
    right:0
  },
  buttonWrapper:{
    position:'absolute',
    top:'35.5%',
    right:'5%',
    zIndex:100
  },
  modalWrapper:{
    position:'absolute',
    left: '50%', 
    top: '50%', 
    transform: 'translate(-50%,-50%)',
    display:'flex',
    justifyContent:'row',
    alignItems:'center',
    zIndex:1000,
    height:'5in',
    width:'3in',
    justifyContent:'space-around',
    backgroundColor:'#ffffff'
  }
};