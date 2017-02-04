import React from 'react';

import PageSingle from '../PagesWidget/PageSingle.jsx'

export default class PagesWidget extends React.Component {

    constructor() {
        super();

        this.state = {
            showPanel: 0
        }
    }

    handleClick() {
        this.setState({
            showPanel: this.state.showPanel + 1
        })
    }

    // getAllPostsCount(){
    //     allPosts = this.props.posts;

    //     count = 0;

    //     allPosts.forEach((eachPost) => {
    //         count += eachPost.posts.length
    //     })

    //     return count;
    // }

    render() {
        
        pages = [
            'nusms',
            'PBUH.TheLightofLife.1438H',
            'nusms.ias',
            'projectlink2017',
            'valour2017',
            'rihlah1438H',
            'nusprojectasa',
            'freshmencamp',
            'BrothersOfNUS',
            'voksnus'
        ]


        // // posts = this.props.posts


        pagesPanel = (
                <div className="eventsPanel">
                    <h6>
                        9 Posts Since Yesterday
                    </h6>
                    <hr/>
                    {pages.map((page) => {
                        return <PageSingle key={page} page={page}/>
                    })}
                </div>
            )

        showPanel = this.state.showPanel
        // // console.log('showEventsMod', showEvents % 2)

        panelArea = "";
        if (showPanel % 2 === 1)
            panelArea = pagesPanel;


        return (
            <div>
                {panelArea}
                <a onClick={this.handleClick.bind(this)} className="bottomLeft white-text mainLink">
                    <i className="material-icons iconAlign">flag</i>
                    &nbsp;NUSMS Pages 
                </a>
            </div>
        )
    }
}
