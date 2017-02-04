import React from 'react';

export default class PageSingle extends React.Component{


  render(){

    page = this.props.page
    posts = this.props.posts


    pageURL = "https://www.facebook.com/" + page

    return(

      <div>
          <a className="white-text mainLink" href={pageURL} target="_blank">
           <p className="truncate">{page} </p>
          </a>
      </div>

    )
  }
}
