import React from 'react';

export default class Greeting extends React.Component{

  constructor() {
      super();

      this.state = {
          showUserInputField: false,
          currTime: this.getCurrTime(),
          currAmPm: this.getCurrAmPm()
      }
    }
    getCurrTime(){
      currTime = moment().format("h:mm")
      return currTime;
    }

    getCurrAmPm(){
      currAmPm = moment().format("a")
      return currAmPm;
    }

    updateCurrTime(){
      this.setState({
        currTime: this.getCurrTime()
      });
    }

    componentDidMount(){
        var that = this;
        setInterval(that.updateCurrTime.bind(that), 1000);
      }

  handleClick(){
    this.setState({showUserInputField: true})
  }

  handleHover(){
    $(".userNameArea").css({"font-size": "1.2em", "text-decoration": "underline"})
  }

  handleUnHover(){
     $(".userNameArea").css({"font-size": "1em", "text-decoration": "none","content": "[Click To Edit]"})
     $(this).before($('<span>').text("Joe's Task: "));


  }

  handleSubmit(e){
    e.preventDefault()

    userName = this.refs.userName.value.trim() !== "" ? this.refs.userName.value.trim() : (localStorage.getItem("userName") || "awak")


    localStorage.setItem("userName", userName);

    this.setState({showUserInputField: false})
  }

  render(){

    userName = localStorage.getItem("userName") || "<Insert Name>";

    if (!localStorage.getItem("userName"))
      defaultName = ""
    else {
        defaultName = userName;
    }


    userNameSpan = <span className="userNameSpan" >{userName} <i className="material-icons editContent">edit_mode</i></span>
    userInputField = (
      <form onSubmit={this.handleSubmit.bind(this)}  className="greetingInput">
        <input type="text" ref="userName" name="userName" defaultValue={defaultName}/>
      </form>
    )

    showUserInputField = this.state.showUserInputField

    userNameArea = showUserInputField ? userInputField : userNameSpan

    currTime = this.getCurrTime();

    return( 
      <div className="center header truncate" >
        <h1 className="time">{this.state.currTime} <span className="smallFont ampm">{this.state.currAmPm}</span></h1>
        <p className="greet">Assalamualaikum, <span className="userNameArea" onClick={this.handleClick.bind(this)} >{userNameArea}</span></p>
      </div>
    )
  }
}
