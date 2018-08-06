import React from 'react';
import '../index.css';

const Landing = () => (    
    <section className="landing">
        <h1 className="hero-title">Turn the music up!</h1>
        <section>
            <img src={'https://previews.dropbox.com/p/thumb/AAKB4AbnqDh1PyyFNIcykYAOoZWYU1SYQkHMCW_9SRKJzXYjbZs9kBzFvKW2HOZKVqwVFe9KVuEyJ-wqBwxbjNWSpjHpO3EeyubJdX_PGptasIz3Qx_6ifIb5H0ZOvypnfWmJIimBz9mi7l4PVo1o-jZZd4k8rMWqhNRsPNkafaWNLCZ2cjKXc2k2KiDka8vMWgt_mZNI6kHIpyscs11mz65-gtO0beXudGNdkR9ga42JQ/p.jpeg?size=1600x1200&size_mode=3'} alt='man wearing headphones' className="headphones-photo" />
        </section>
        <section className="selling-points">
            <div className="point">
                <h2 className="point-title">Choose your music</h2>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>
            <div className="point">
                <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                <p className="point-description">No arbitrary limits. No distractions.</p>
            </div>
            <div className="point">
                <h2 className="point-title">Mobile enabled</h2>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>
        </section>
    </section>
);

export default Landing;