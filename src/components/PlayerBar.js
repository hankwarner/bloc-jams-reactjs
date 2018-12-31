import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
});

class PlayerBar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>

                            <button onClick={this.props.handlePrevClick} >
                                <span className="ion-skip-backward mdl-js-ripple-effect"></span>
                            </button>
                            <button onClick={this.props.handleSongClick} >
                                <span className={this.props.isPlaying ? "ion-pause" : "ion-play" }></span>
                            </button>
                            <button onClick={this.props.handleNextClick} >
                                <span className="ion-skip-forward"></span>
                            </button>

                            <div>
                                {this.props.formatTime(this.props.currentTime)}
                            
                                <input 
                                    type="range" 
                                    className="mdl-slider mdl-js-slider" 
                                    value={(this.props.currentTime / this.props.duration) || 0} 
                                    max="1" 
                                    min="0" 
                                    step="0.01"
                                    onChange={this.props.handleTimeChange}
                                /> 

                                {this.props.formatTime(this.props.duration)}
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
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
                        </Paper>
                    </Grid>
                </Grid>
            </div>            
        );
    }
}

PlayerBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(PlayerBar);