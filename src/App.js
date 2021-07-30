import React from "react";
import Repobox from "./Components/Repobox";

import './App.css';

const testUser = {
  avatar_url: "https://avatars.githubusercontent.com/u/25753980?v=4",
  bio: "FERN Stack...",
  blog: "http://jamesbaloyi.xyz",
  company: "APPXYZ",
  created_at: "2017-02-13T20:43:41Z",
  email: null,
  events_url: "https://api.github.com/users/James-Baloyi/events{/privacy}",
  followers: 8,
  followers_url: "https://api.github.com/users/James-Baloyi/followers",
  following: 0,
  following_url: "https://api.github.com/users/James-Baloyi/following{/other_user}",
  gists_url: "https://api.github.com/users/James-Baloyi/gists{/gist_id}",
  gravatar_id: "",
  hireable: null,
  html_url: "https://github.com/James-Baloyi",
  id: 25753980,
  location: "Johannesburg, South Africa",
  login: "James-Baloyi",
  name: "James Baloyi",
  node_id: "MDQ6VXNlcjI1NzUzOTgw",
  organizations_url: "https://api.github.com/users/James-Baloyi/orgs",
  public_gists: 0,
  public_repos: 30,
  received_events_url: "https://api.github.com/users/James-Baloyi/received_events",
  repos_url: "https://api.github.com/users/James-Baloyi/repos",
  site_admin: false,
  starred_url: "https://api.github.com/users/James-Baloyi/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/James-Baloyi/subscriptions",
  twitter_username: null,
  type: "User",
  updated_at: "2021-07-02T13:16:59Z",
  url: "https://api.github.com/users/James-Baloyi",
}


class App extends React.Component{
  constructor(){
    super();

    this.state = {
      selectedUser: testUser,
      predictUsers: [],
      selectedTab: "",
      repos: []
    }
  }
  
  searchUser(event){
    var {value} = event.target;
    var resultsArray = new Array();
    if(value.length > 1){
      var xhr = new XMLHttpRequest();
      var url = "https://api.github.com/users/"+value;
      xhr.open("GET", url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            resultsArray.push(json);
            console.log(resultsArray);
            this.setState({predictUsers: resultsArray});
          }
        }
      }
      xhr.send();
    }
  }

  displayProfileInfo(users){
    this.resetProfile();

    var user = users[0];
    this.setState({selectedUser: user}, ()=>{
      console.log(this.state.selectedUser);
    });
  }

  showRepos(url, title){
    this.setState({selectedTab: title});

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var json = JSON.parse(xhr.responseText);
              this.setState({repos: json},
                ()=>{
                  console.log(json);
                });
            }
          }
        }
        xhr.send();
      }

  resetProfile(){
    this.setState({repos: []});
    this.setState({selectedTab: ""});
    this.setState({predictUsers: []});
  }
    

  render(){
    var predictiveText = () => {
      if(this.state.predictUsers.length > 0){
        return <button onClick={()=>{this.displayProfileInfo(this.state.predictUsers)}}>{this.state.predictUsers[0].name}</button>
      }else{
        return null;
      }
    }

    var repos = this.state.repos;
    if(repos.length > 0){
      var repos_jsx = repos.map(repo => {
        return (
          <Repobox repo={repo} key={repo.name}/>
        );
      })
    }


    return(
      <>
      <center>
        <nav className="header">
          <input type="text" autoFocus={true} className="search-box" placeholder="Type in a Github username..." onChange={(event)=>{this.searchUser(event)}}/>
          <div className="predictive">
            {predictiveText()}
          </div>  
        </nav><br/>

        <div className="container">
            <img src={this.state.selectedUser.avatar_url} className="git-avatar"/><br/>
              <h1 className="git-username">{this.state.selectedUser.name}</h1>
              <small className="git-bio">{this.state.selectedUser.bio}</small><br/>
              <small className="git-location">{this.state.selectedUser.location}</small>
              <br/>
              <div className="clickables">
                <small className="git-clickable"><a target="_blank" href={this.state.selectedUser.blog}>Website</a></small>
                <small className="git-clickable"><a target="_blank" href={this.state.selectedUser.html_url}>Github Profile</a></small>
                <small className="git-clickable"><a target="_blank" href={this.state.selectedUser.html_url+"?tab=followers"}>{this.state.selectedUser.followers} Followers</a></small>  
                <small className="git-clickable blue"><a onClick={(event)=>{event.preventDefault(); this.showRepos(this.state.selectedUser.repos_url, "Repositories")}}>Repositories ({this.state.selectedUser.public_repos})</a></small> 
              </div>
        </div>

        <div className="sub-api-container">
          <h3 className="sub-header">{this.state.selectedTab}</h3>
          {repos_jsx}
        </div>
      </center>
      </>
    );
  }
}

export default App;
