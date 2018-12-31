import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


class PlayerBar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <section>
                <section>
                    <button onClick={this.props.handlePrevClick} >
                        <span className="ion-skip-backward mdl-js-ripple-effect"></span>
                    </button>
                    <button onClick={this.props.handleSongClick} >
                        <span className={this.props.isPlaying ? "ion-pause" : "ion-play" }></span>
                    </button>
                    <button onClick={this.props.handleNextClick} >
                        <span className="ion-skip-forward"></span>
                    </button>
                </section>
                <div classes={{ container: classes.slider }}>
                    <section>
                        <div>{this.props.formatTime(this.props.currentTime)}</div>
                        <input 
                            className="mdl-slider mdl-js-slider"
                            type="range"
                            value={(this.props.currentTime / this.props.duration) || 0} 
                            max="1" 
                            min="0" 
                            step="0.01"
                            onChange={this.props.handleTimeChange}                        
                        />   
                        <div>{this.props.formatTime(this.props.duration)}</div> 
                    </section>
                    <section>
                        <div className="icon ion-volume-low"></div>
                        <input 
                            className="mdl-slider mdl-js-slider"
                            type="range" 
                            value={this.props.currentVolume}
                            max="1.0" 
                            min="0.0"
                            step="0.01"
                            onChange={this.props.handleVolumeChange}
                        /> 
                        <div className="icon ion-volume-high"></div>
                    </section>
                </div>
            </section>
                
        );
    }
}

PlayerBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
  export default withStyles(styles)(PlayerBar);