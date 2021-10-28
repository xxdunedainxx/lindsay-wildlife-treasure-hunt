import React from 'react';

import './AboutPageComponent.css';

// Asset Imports
import linkedinLogo from './linkedin.png';
import githubLogo from './github.png';
import rory from './rory.jpeg';
import zach from './zach.jpeg';

var zachDescription = `
Hey im zach
`;

var roryDescription = `
Hey im rory
`;

export class AboutPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        This application was made in collaboration with Zach McFadden and Roderick MacLeod. 
        The source code for the treasure hunt can be found <a href="https://github.com/xxdunedainxx/lindsay-wildlife-treasure-hunt">here</a>!
        <br/>
        <br/>
        <Profile 
          name="Zach" 
          description={zachDescription} 
          profilePic={zach} 
          linkedInHref="https://www.linkedin.com/in/zach-mcfadden-09551aa2/"
          githubHref="https://github.com/xxdunedainxx"
        />
        <br/>
        <Profile 
          name="Rory" 
          description={roryDescription} 
          profilePic={rory} 
          linkedInHref="https://www.linkedin.com/in/rjmacleod/"
          githubHref="https://github.com/rjmacleod"
        />
      </div>
    );
  }
}

export class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      description: props.description,
      profilePic: props.profilePic,
      linkedInHref: props.linkedInHref,
      githubHref: props.githubHref
    }
  }

  render(){
    return (
      <div className="profile">
        <div className="profileName">
          {this.state.name}
        </div>
        <br/>
        <div className="profilePicContainer">
          <img className="profilePic" src={this.state.profilePic} alt="Hey!" />
        </div>
        <div className="profileAbout">
          About me: {this.state.description}
        </div>
        <div className="logoContainer">
          <a href={this.state.linkedInHref}>
            <img src={linkedinLogo} alt="Linked In" />
          </a>
        </div>
        <div className="logoContainer">
          <a href={this.state.githubHref}>
            <img src={githubLogo} alt="Git Hub" />
          </a>
        </div>
      </div>
    );
  }
}

export default AboutPage;