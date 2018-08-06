import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import '../index.css';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }
    
    render() {
        return (
            <div className="library-albums">
                <section className='library'>
                    { 
                        this.state.albums.map( (album, index) =>
                            <Link to={`/album/${album.slug}`} key={index}>
                                <img src={album.albumCover} alt={album.title} className="album-photo" />
                                <div className="album-block">{album.title}</div>
                                <div className="album-block">{album.artist}</div>
                                <div className="album-block-bottom">{album.songs.length} songs</div>
                            </Link>
                        )
                    }
                </section>
            </div>
        );
    }
}

export default Library;