import React from 'react';

export default class Home extends React.Component{

  constructor() {
      super();

      this.state = {
          showUserInputField: false
      }
    }

    componentDidMount(){
      $('.boingInUp').addClass('magictime boingInUp');
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


    userName = localStorage.getItem("userName") || "awak";
    userNameSpan = <span className="userNameSpan" >{userName} <i className="material-icons editContent">edit_mode</i></span>
    userInputField = (
      <form onSubmit={this.handleSubmit.bind(this)}  className="greetingInput">
        <input type="text" ref="userName" name="userName" defaultValue={userName}/>
      </form>
    )

    showUserInputField = this.state.showUserInputField

    userNameArea = showUserInputField ? userInputField : userNameSpan

    return(
      <div className="header truncate swap boingInUp" >
        Salaam, <span className="userNameArea" onClick={this.handleClick.bind(this)} >{userNameArea}</span>
      </div>
    )
  }
}
