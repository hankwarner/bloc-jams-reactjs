import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import '../index.css';

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
        return (
            <section className="album">
                <section className="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list" className="mdl-data-table mdl-js-data-table">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        { 
                            this.state.album.songs.map( (song, index) =>
                                <tr className="song" key={index} 
                                onClick={() => this.handleSongClick(song)} 
                                onMouseEnter={() => this.setState({ hoveredSong: song })} 
                                onMouseLeave={() => this.setState({ hoveredSong: null })}> 
                                    <td className='song-actions mdl-data-table__cell--non-numeric'>
                                            {this.state.currentSong === song ?
                                                (<span className={this.state.isPlaying ? "ion-pause" : "ion-play"} />) :
                                                this.state.hoveredSong === song ? (<span className="ion-play" />) :
                                                (<span className="song-number">{index + 1}</span>)}
                                    </td>
                                    <td className='song-title mdl-data-table__cell--non-numeric'>{song.title}</td> 
                                    <td className='song-duration mdl-data-table__cell--non-numeric'>{this.formatTime(song.duration)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <footer className="player-bar">
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
                </footer>
            </section>
        );
    }
}

export default Album;