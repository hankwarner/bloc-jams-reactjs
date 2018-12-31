import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 700,
    },
});

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug;
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            currentVolume: 0.5,
            duration: album.songs[0].duration,
            isPlaying: false,
            hoveredSong: false,
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumechange: e => {
                this.setState({ currentVolume: this.state.currentVolume})
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount () {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying : false });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    formatTime(time) {
        var sec_num = parseInt(time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var minutesFormatted = (minutes < 10) ? "0"+minutes : minutes;
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var secondsFormatted = (seconds < 10) ? "0"+seconds : seconds;

        if (isNaN(minutes) || isNaN(seconds)) {
            return "-:--";
        } else {
            return minutesFormatted+":"+secondsFormatted;
        }
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        }   else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1 )
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ currentVolume: newVolume });
    }
    
    render() {        
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <img style={{maxWidth: '50%', height:'auto'}} src={this.state.album.albumCover} alt={this.state.album.title} />
                            <p>{this.state.album.title}</p>
                            <p>{this.state.album.artist}</p>
                            <p>{this.state.album.releaseInfo}</p>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Table className={classes.table}>
                                <TableBody>
                                    { 
                                        this.state.album.songs.map( (song, index) =>
                                            <TableRow key={index} 
                                                onClick={() => this.handleSongClick(song)} 
                                                onMouseEnter={() => this.setState({ hoveredSong: song })} 
                                                onMouseLeave={() => this.setState({ hoveredSong: null })}> 
                                                <TableCell align="right">
                                                    {this.state.currentSong === song ?
                                                        (<span className={this.state.isPlaying ? "ion-pause" : "ion-play"} />) :
                                                        this.state.hoveredSong === song ? (<span className="ion-play" />) :
                                                        (<span>{index + 1}</span>)}
                                                </TableCell>
                                                <TableCell align="right">{song.title}</TableCell> 
                                                <TableCell align="right">{this.formatTime(song.duration)}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <PlayerBar 
                                isPlaying={this.state.isPlaying} 
                                currentSong={this.state.currentSong}
                                currentTime={this.audioElement.currentTime}
                                duration={this.audioElement.duration}
                                formatTime={(time) => this.formatTime(time)}
                                currentVolume={this.state.currentVolume}
                                handleVolumeChange={(e) => this.handleVolumeChange(e)}
                                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                                handlePrevClick={() => this.handlePrevClick()}
                                handleNextClick={() => this.handleNextClick()}
                                handleTimeChange={(e) => this.handleTimeChange(e)}
                            />
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

Album.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);
