import React from 'react';

export default class SpeakerSingle extends React.Component{

  render() {
    speaker = this.props.singleSpeaker;

    return (
      <div>

        <p>{speaker}</p>
      </div>

    )
  }
}
