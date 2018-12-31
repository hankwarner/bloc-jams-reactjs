import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

const styles = {
    root: {
      width: 500,
    },
  };

class PlayerBar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <BottomNavigation style={{marginRight: '22%'}}>
                    <BottomNavigationAction
                        label="Previous"
                        onClick={this.props.handlePrevClick}
                        className="ion-skip-backward mdl-js-ripple-effect"
                    />
                    <BottomNavigationAction
                        label="Play"
                        onClick={this.props.handleSongClick}
                        className={this.props.isPlaying ? "ion-pause" : "ion-play" }
                    />
                    <BottomNavigationAction
                        label="Next"
                        onClick={this.props.handleNextClick}
                        className="ion-skip-forward"
                    />
                </BottomNavigation>                     
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <span style={{flexGrow: 1}}>{this.props.formatTime(this.props.currentTime)}</span>
                        
                        <input 
                            type="range" 
                            style={{flexGrow: 6}}
                            value={(this.props.currentTime / this.props.duration) || 0} 
                            max="1" 
                            min="0" 
                            step="0.01"
                            onChange={this.props.handleTimeChange}
                        /> 

                    <span style={{flexGrow: 1}}>{this.props.formatTime(this.props.duration)}</span>
                    
                    <span style={{flexGrow: 1}} className="icon ion-volume-low"></span>
                    <input 
                        type="range" 
                        style={{flexGrow: 1}}
                        value={this.props.currentVolume}
                        max="1.0" 
                        min="0.0"
                        step="0.01"
                        onChange={this.props.handleVolumeChange}
                    />
                    <span style={{flexGrow: 1}} className="icon ion-volume-high"></span>

                </div>
            </div>     
        );
    }
}

PlayerBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(PlayerBar);