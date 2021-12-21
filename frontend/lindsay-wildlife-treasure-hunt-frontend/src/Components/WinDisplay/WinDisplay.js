import React from "react";
import GameController from "../../src/game/Game";
import './WinDisplay.css'

import './WinDisplay.css';

import Logger from '../../src/util/Logger';
import UserInformationSubmitClient from '../../src/http/clients/UserInformationSubmitClient';
import Configuration from '../../src/conf/Configuration';
import HttpArgParser from '../../src/util/HttpArgParser';

function deleteProgress() {
  GameController.resetGame();
  GameController.gameState.gameComplete = false;
  GameController.saveState();
  window.location.href = '/ui/game';
}

export class WinDisplay extends React.Component {

    constructor(props) {
        super(props)
        GameController.loadSessionData()

        this.state = {
            gameComplete: GameController.gameState.gameComplete,
        }
    }

    render(){
        if(this.state.gameComplete || HttpArgParser.DEBUG_MODE == "true") {
            return(
                <div className="win-text win-page-container">
                    <h2>You Win!</h2>
                    Congratulations you found all the correct answers! To collect your prize, just tell our Guest Experience team located at the front desk that you completed the scavenger hunt!
                    <br /><br/>
                    <h3>Want to redeem your prize later? </h3>
                    Fill out the information below and get emailed a certificate. When you're ready to collect, show your certificate to the Guest Experience team and get your well earned treasure.
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
                    <a href='/ui/game'>Back to the game</a>
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

    async submitEmail() {
        const email = document.getElementById("email-input").value;
        if(!email || email == ''){
          alert("The 'email' field is required")
          return
        }
        let names = [];
        for(let i = 0; i < this.state.numberOfPlayers; i++) {
            const name = document.getElementById("name-input-"+(i+1));
            if(!name || name.value == ''){
              alert('Please fill out all of the name fields')
              return
            }
            names.push(name.value);
        }
        Logger.info("submitting email to " + email + " for " + names);
        let userSubmitClient = new UserInformationSubmitClient(
          `${Configuration.remoteEndpoint}`
        );
        let goodRequest = await userSubmitClient.submitUserRequest(email, names);
        console.log(goodRequest)
        if(goodRequest == true){
          deleteProgress();
        }
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
                    <div className="win-text get-number-of-players-container">
                        <p>How many players were there? (You'll get a certificate for each one!)</p>
                        <select
                            className="win-text num-players-drop-down"
                            id="drop-down-num-players"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>&nbsp;&nbsp;
                        <button
                            className="win-button num-players-button"
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
                    className="win-button cert-button"
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

    render() {
        return(
            <div className="restart-game-container">
                <RestartGameButton
                    restartGameButton={this.restartGameButton.bind(this)}
                    tryAgainClicked={this.state.tryAgainClicked}
                    deleteProgress={deleteProgress.bind(this)}
                />
            </div>
        );
    }
}

function RestartGameButton(props) {
    if(!props.tryAgainClicked) {
        return(
            <button
                className="win-button restart-game-button"
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
                    className="win-button delete-progress-button"
                    onClick={props.deleteProgress}
                >
                    Restart Game
                </button>
            </div>
        );
    }
}


export default WinDisplay;