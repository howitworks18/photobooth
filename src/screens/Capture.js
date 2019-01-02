import React, { Component } from 'react';
import placeHolder from '../assets/download.jpg';
import '../App.css';
import Webcam from "react-webcam";

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.state={
      countDown:null,
      imageCount:0,
      imageOne:null,
      imageTwo:null,
      imageThree:null,
      newImage:null

    }
  }

  takePicture() {
    this.setState({
      imageCount:0,
      imageOne:null,
      imageTwo:null,
      imageThree:null
    })

    this.timer()

    this.photoShoot = setInterval(() => {
      if(this.state.imageCount !== 3){
        this.onTakePhoto()
        this.timer()
      }else{
        clearInterval(this.photoShoot)
      }
    }, 4000);
  }

  timer(){
      setTimeout(()=>{
        this.setState({
          countDown:1
        })
      }, 1000)
      setTimeout(()=>{
        this.setState({
          countDown:2
        })
      }, 2000)
      setTimeout(()=>{
        this.setState({
          countDown:3
        })
      }, 3000)
      setTimeout(()=>{
        this.setState({
          countDown: null
        })
      }, 4000)
  }

  onTakePhoto() {
    const imageSrc = this.webcam.getScreenshot();
    let imageCount = this.state.imageCount;
    if(imageCount === 0){
      this.setState({
        imageOne:imageSrc
      })
    }else if(imageCount === 1 ){
      this.setState({
        imageTwo:imageSrc
      })
    }else if(imageCount === 2){
      this.setState({
        imageThree:imageSrc
      })
    }
    this.setState({
      imageCount:this.state.imageCount + 1
    })
  }

  setRef = webcam => {
    this.webcam = webcam;
  };
  
  render() {
    return (
        <div>
          <div style={style.container}>
            <div className="hide" style={style.imagesWrapper}>
                <img style={style.imagesPreview} src={this.state.imageOne === null ? placeHolder : this.state.imageOne}/>
                <img style={style.imagesPreview} src={this.state.imageTwo === null ? placeHolder : this.state.imageTwo}/>
                <img  style={style.imagesPreview} src={this.state.imageThree === null ? placeHolder : this.state.imageThree}/>
            </div>
            <div className="hide">
              <Webcam
                style={style.preview}
                audio={false}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                screenshotWidth={139.2}
                videoConstraints={{facingMode: "user"}}
                />
              <button style={style.captureButton} onClick={this.takePicture}></button>
              <div style={style.countDown}>
                {this.state.imageCount === 3 ? null : this.state.countDown}
              </div>
            </div>
          <div/>
          </div>
        </div>
      );
    }
  }

const style = {
  container:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around',
    height:'100vh',
    backgroundColor:'#2d3436'
  },
  preview: {
    height:'100vh',
    width:'100vh',
    position: 'relative',
    transform: 'scaleX(-1)'
  },
  captureButton: {
    position:'absolute',
    left: '63%', 
    bottom: '10%', 
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  imagesWrapper:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  imagesPreview:{
    height:'183px',
    width:'244px',
    transform: 'scaleX(-1)',
    marginTop:10
  },
  images:{
    height:'1.20in',
    width:'1.45in',
    transform: 'scaleX(-1)'
  },
  lastImage:{
    height:'1.20in',
    width:'1.45in'
  },
  countDown:{
    position:'absolute',
    left: '56%', 
    top: '43%', 
    transform: 'translate(-50%,-50%)',
    color:'#ffffff',
    fontSize:250
  }
};