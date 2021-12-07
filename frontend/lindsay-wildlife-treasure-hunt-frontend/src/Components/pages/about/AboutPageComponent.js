import React from 'react';

import './AboutPageComponent.css';

// Asset Imports
import linkedinLogo from './linkedin.png';
import githubLogo from './github.png';
import rory from './rm-headshot.jpeg';
import zach from './zach.jpeg';

var zachDescription = `
Hey! I am a Bay Area native through and through. 
Born in Vallejo and growing up in Moraga, 
I had the amazing opportunity to visit Lindsay Wildlife 
all the time as a kid and appreciate its amazingness. These days I work as a full time Software Engineer at Workday, based in Pleasanton. When I'm not working I enjoy spending time with friends and family, playing music, tinkering with video game development, and most importantly: spending time with my partner Erin and my two dogs Bear and Fox. 
Shout out to Lindsay Wildlife for the amazing experience of working on this addition to the exhibit hall!
`;

var roryDescription = `
Roderick MacLeod is a QA and Software Developer from the Bay Area. He has fond memories of visiting the Lindsay Wildlife Experience throughout his childhood while growing up in Lafayette. He attended U.C. Santa Cruz, where he studied math and physics. His interests include data science and cybersecurity, as well as cooking, art and hiking.
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
          name="Roderick" 
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