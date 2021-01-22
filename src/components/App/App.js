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
      btnClassC: true,
      btnClassB: false,
      grayScale: true
    };
  }
  colorfulGallery = () => {
    this.setState({
      btnClassC: true,
      btnClassB: false,
      grayScale: true
    })
  }
  blackAndWhiteGallery = () => {
    this.setState({
      btnClassC: false,
      btnClassB: true,
      grayScale: false
    })
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
           <a href="#gallery" onClick={this.colorfulGallery} className={this.state.btnClassC ? 'header-btn-color' : 'header-btn-black'} >Colorful Gallery</a>
           <a href="#gallery" onClick={this.blackAndWhiteGallery} className={this.state.btnClassB ? 'header-btn-color' : 'header-btn-black'}  >B&W Gallery</a>
          </div>
        </div>
        <div id='gallery'>
          <Gallery  className="gallery" tag={this.state.tag} grayScale={this.state.grayScale} />
        </div>
      </div>
    );
  }
}

export default App;
