import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import PhotoHeader from './img/background-header.jpg'



class App extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.state = {
      tag: 'art'
    };
  }

  render() {
    return (
      <div className='app-root'>
        <div className='app-header' style={{ backgroundImage: `url(${PhotoHeader})` }}>
          <div className='text-container'>
            <p>Flickr Gallery</p>
            <h2>Find your inspiration</h2>
          </div>
          <input className='app-input' onChange={event => this.setState({ tag: event.target.value })} value={this.state.tag} />
          <div className='btn-container'>
            <button className='header-btn'>Colorful Gallery</button>
            <button className='header-btn' disabled>B&W Gallery</button>
          </div>
        </div>
        <Gallery tag={this.state.tag}/>
      </div>
    );
  }
}

export default App;
