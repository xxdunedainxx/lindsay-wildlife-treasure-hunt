import React from "react";

// Answer Display
export class AnswerDisplay extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.displayAnswer) {
        return(
            <div className="display-answer-container">
            <h1 className="artifact-name">
                {this.props.artifactName}
            </h1>
            <img
                className="artifact-image"
                src={this.props.artifactMediaUrl}
            /><br/>
            <p className="artifact-text">
                {this.props.artifactText}
            </p><br/>
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
        onClick={props.onClick}
      >
        Next Level
      </button>
    );
}

export default AnswerDisplay;