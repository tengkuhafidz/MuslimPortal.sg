import React from 'react';

export default class ColorModeWidget extends React.Component {

    // constructor() {
    //     super();

    //     this.state = {
    //         bgColor: parseInt(localStorage.getItem("bgColor")) || 0
    //     }
    // }

  handleClick(){
    currentBgColor = parseInt(localStorage.getItem("bgColor")) || 0
    localStorage.setItem("bgColor", ++currentBgColor)
    console.log("bgColor", localStorage.getItem("bgColor"))
    this.setBgColor()
  }


  setBgColor(){
        var colors = ["rgba(15,109,102, 0.8), rgba(15,109,102, 0.8)", "rgba(11,57,84, 0.9), rgba(11,57,84, 0.9)", "rgba(46,41,78, 0.9), rgba(46,41,78, 0.9)", "rgba(0,0,0, 0.8), rgba(0,0,0, 0.8)"];
        var currentBgColor = parseInt(localStorage.getItem("bgColor")) % colors.length || 1
        var image = this.props.image;

        document.body.style.background = "linear-gradient("+colors[currentBgColor]+"), url('/bg/" + image + ".jpg') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover";  

  }

  render() {

    return (
      <div className="colorMode">
        <div onClick={this.handleClick.bind(this)}>
          <i className="fa fa-paint-brush" aria-hidden="true"></i>
        </div>
      </div>
    )


  }
}
