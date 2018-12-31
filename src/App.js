import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import albums from './data/albums';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
