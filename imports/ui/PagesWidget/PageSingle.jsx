import React from 'react';

export default class PageSingle extends React.Component{


  render(){

    post = this.props.post

    pageName = post.name
    pageId = post.by
    pageCount = post.posts.length
    
    lastUpdatedArea = post.posts.length < 1 ? "" : <span className="smallFont right halfSee topGapSmaller"> {moment(post.posts[0].created_time).fromNow()} </span>

    pageURL = "https://www.facebook.com/" + pageId

    return(

      <div>
          <a className="white-text" href={pageURL} target="_blank">
           <p className="truncate">{pageName} ({pageCount}) {lastUpdatedArea}</p>
          </a>
      </div>

    )
  }
}
