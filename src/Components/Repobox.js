import React from "react";

class Repobox extends React.Component{
    render(){
        return(
            <fieldset className="repo-box">
                <b>{this.props.repo.name.substring(0,25)}</b><br/>
                <div className="description-container">
                    <small>Stargazers: {this.props.repo.stargazers_count}</small> &nbsp; <small>Watchers: {this.props.repo.watchers_count}</small><br/>
                    <small>Forks: {this.props.repo.forks_count}</small> &nbsp; <small>Open Issues: {this.props.repo.open_issues_count}</small><br/>
                </div>
                <br/>
                <small className="git-clickable"><a target="_blank" href={this.props.repo.svn_url}>View on Github</a></small>
        </fieldset>
        );
    }
}

export default Repobox;
