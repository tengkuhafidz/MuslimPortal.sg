import React from 'react';

export default class TagSingle extends React.Component{

  render() {
    tag = this.props.singleTag;

    return (
        <div className="chip marginRightSmall">
    		{tag}
  		</div>

    )
  }
}
