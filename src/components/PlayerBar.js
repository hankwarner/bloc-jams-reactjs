import React, { Component } from 'react';
import '../index.css';

class PlayerBar extends Component {

    render() {
        return (
            <section className="player-bar">
                <section className="buttons">
                    <button id="previous" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" onClick={this.props.handlePrevClick} >
                        <span className="ion-skip-backward mdl-js-ripple-effect"></span>
                    </button>
                    <button id="play-pause" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={this.props.handleSongClick} >
                        <span className={this.props.isPlaying ? "ion-pause" : "ion-play" }></span>
                    </button>
                    <button id="next" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect" onClick={this.props.handleNextClick} >
                        <span className="ion-skip-forward"></span>
                    </button>
                </section>
                <div className="controls">
                    <section className="time">
                        <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
                        <input 
                            type="range" 
                            className="track-slider"
                            value={(this.props.currentTime / this.props.duration) || 0} 
                            max="1" 
                            min="0" 
                            step="0.01"
                            onChange={this.props.handleTimeChange}                        
                        />   
                        <div className="total-time">{this.props.formatTime(this.props.duration)}</div> 
                    </section>
                    <section className="volume">
                        <div id="volume-low" className="icon ion-volume-low"></div>
                        <input 
                            type="range" 
                            className="volume-slider"
                            value={this.props.currentVolume}
                            max="1.0" 
                            min="0.0"
                            step="0.01"
                            onChange={this.props.handleVolumeChange}
                        /> 
                        <div id="volume-high" className="icon ion-volume-high"></div>
                    </section>
                </div>
            </section>
                
        );
    }
}

export default PlayerBar;