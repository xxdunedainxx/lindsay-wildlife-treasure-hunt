import React from "react";
import GameController from "../../src/game/Game";

export class WinDisplay extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            gameComplete: GameController.gameState.gameComplete,
        }
    }

    render(){
        if(this.state.gameComplete) {
            return(
                <div className="win-page-container">
                    <h2>You Win!</h2>
                    <h4>Now get your certificate of Lindsay Wildlife Experience Scavenger Hunt Mastery!</h4>
                    <GetCertificateDisplay/>
                    <br/>
                    <br/>
                    <RestartGameDisplay/>
                </div>
            );
        }
        else {
            return(
                <div className="win-page-error-container">
                    <h3>Oops!</h3><br/>
                    <p>Something went wrong.</p><br/>
                    <h6>Did you get here by mistake?</h6><br/>
                    <link to='/game'>Return to Game</link>
                </div>
            )
        }
    }

}

// Get Certificate Display

class GetCertificateDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            numberOfPlayers: null,
            formSubmitted: null,
            submitError: null,
        }
    }

    submitNumberOfPlayersButton() {
        const dropDown = document.getElementById('drop-down-num-players');

        this.setState({
            numberOfPlayers: dropDown.value,
        });
    }

    submitEmail() {
        const email = document.getElementById("email-input").value;
        let names = [];
        for(let i = 0; i < this.state.numberOfPlayers; i++) {
            const name = document.getElementById("name-input-"+(i+1));
            if(name && name != '') {
                names.push(name.value);
            }
        }
        console.log("submitting email to " + email + " for " + names);
        return
    }

    formPreventDefault(e) {
        e.preventDefault();
        this.submitEmail();
    }

    render() {
        if(!this.state.formSubmitted) {
            if(this.state.submitError) {
                return null;
            }
            else if(this.state.numberOfPlayers) {
                return(
                    <div
                        className="get-certificate-container"
                    >
                        <EmailForm

                            numberOfPlayers={this.state.numberOfPlayers}
                            formPreventDefault={this.formPreventDefault.bind(this)}
                            onClickPreventDefault={this.formPreventDefault.bind(this)}
                        />
                    </div>
                );
            }
            else{
                return(
                    <div className="get-number-of-players-container">
                        <p>How many players were there? (You'll get a certificate for each one!)</p>
                        <select
                            id="drop-down-num-players"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button
                            onClick={this.submitNumberOfPlayersButton.bind(this)}
                        >Submit</button>
                    </div>
                );
            }
        }
        else if(this.state.formSubmitted) {
            return(null);
        }
    }
}

function EmailForm(props) {
    if(!props.formSubmitted && !props.submitError) {
        let nameFields = [];
        for(let i = 0; i < props.numberOfPlayers; i++) {
            const id = 'name-input-' + (i+1);
            nameFields.push(<div><label>Name: </label><input
                    type="text"
                    id={id}
                ></input><br/></div>)
        }

        return(
            <form
                onSubmit={props.formPreventDefault}
            >
                {nameFields}
                <br/>
                <label>Email: </label>
                <input
                    type="text"
                    id="email-input"
                ></input><br/>
                <br/>
                <button
                    onClick={props.formPreventDefault}
                >Get Your Certificate(s)!</button>
            </form>
        )
    }
    else if(props.submitError) {
        return(null);
    }
    else {

    }
}

// Restart Game Display

class RestartGameDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tryAgainClicked: false,
        }
    } 

    restartGameButton() {
        this.setState({
            tryAgainClicked: true,
        })
    }

    deleteProgress() {
        GameController.resetGame();
        GameController.gameState.gameComplete = false;
        GameController.saveState();
        window.location.href = '/game';
    }

    render() {
        return(
            <div className="restart-game-container">
                <RestartGameButton
                    restartGameButton={this.restartGameButton.bind(this)}
                    tryAgainClicked={this.state.tryAgainClicked}
                    deleteProgress={this.deleteProgress.bind(this)}
                />
            </div>
        );
    }
}

function RestartGameButton(props) {
    if(!props.tryAgainClicked) {
        return(
            <button
                className="restart-game-button"
                onClick={props.restartGameButton}
            >
                Want to play again?
            </button>
        );
    }
    else {
        return(
            <div className="restart-game-button-container">
                <p>
                    Are you sure? You'll lose your progress.<br/>
                    (Make sure you got your certificate!)
                </p>
                <button
                    className="delete-progress-button"
                    onClick={props.deleteProgress}
                >
                    Restart Game
                </button>
            </div>
        );
    }
}


export default WinDisplay;