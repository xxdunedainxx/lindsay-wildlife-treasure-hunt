import React from "react";
import Configuration from '../../src/conf/Configuration';
// Answer Display
export class AnswerDisplay extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.displayAnswer) {
        let artifactUrl = `${Configuration.remoteEndpoint}/${this.props.artifactMediaUrl}`
        return(
            <div className="display-answer-container">
            <div className="artifact-name-container"><h1 className="game-text artifact-name">
                {this.props.artifactName}
            </h1></div>
            <img
                className="artifact-image"
                src={artifactUrl}
                alt={this.props.artifactName}
            /><br/>
            <div
                className="artifact-text-container game-text"
            >
                {this.props.artifactText}
            </div>
            <br/>
            <NextLevelButton
                onClick={this.props.nextLevelButton}
            />
            </div>
        );
        }
        return null;
    }
}

// Answer Display Components
function NextLevelButton(props) {
    return(
      <button
        className="game-button next-level-button"
        onClick={props.onClick}
      >
        Next
      </button>
    );
}

export default AnswerDisplay;