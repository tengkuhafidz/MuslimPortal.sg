import React from 'react';

const request = require('request');
const moment = require('moment');

export default class HijrahWidget extends React.Component {

    render() {

        var j = (this.props.fast)
            ? <p className="betaFont smallFont noTopGap halfSee right-align">
                    <i>Its sunnah to fast {this.props.fast}!</i>
                </p>
            : '';
        return (
            <div>
                <span>{this.props.hijrah}</span>
                {j}
            </div>
        )

    }

}
