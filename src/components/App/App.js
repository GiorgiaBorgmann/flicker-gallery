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
      tag: 'art',
      color: true,
      btnClassC: false,
      btnClassB: true,
      grayScale: true
    };
  }
  colorfulGallery = () => {
    this.setState({ color: true })
    this.setState({ btnClassC: true })
    this.setState({ btnClassB: false })
    this.setState({ grayScale: true })
  }
  blackAndWhiteGallery = () => {
    this.setState({ color: false })
    this.setState({ btnClassC: false })
    this.setState({ btnClassB: true })
    this.setState({ grayScale: false })
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
            <button onClick={this.blackAndWhiteGallery} className={this.state.btnClassB ? 'header-btn-color' : 'header-btn-black'}  >B&W Gallery</button>
            <button onClick={this.colorfulGallery} className={this.state.btnClassC ? 'header-btn-color' : 'header-btn-black'} >Colorful Gallery</button>
          </div>
        </div>
        <Gallery tag={this.state.tag} grayScale={this.state.grayScale} />
      </div>
    );
  }
}

export default App;
