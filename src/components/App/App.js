import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import NavBar from '../NavBar/NavBar';
import FontAwesome from 'react-fontawesome';

class App extends React.Component {

  constructor() {
    super();
    addEventListener('scroll', () => {
      document.body.style.setProperty('--scroll', window.pageYOffset);
      this.setState({ scrollY: window.pageYOffset })
    }, false);
    addEventListener('resize', () => this.setState({ galleryWidth: this.getGalleryWidth() }))
    this.state = {
      tag: 'art',
      inputText: '',
      btnClassC: true,
      btnClassB: false,
      grayScale: true,
      scrollY: 0,
      galleryWidth: this.getGalleryWidth()
    };
  }
  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  componentWillUnmount() {
    removeEventListener('resize')
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
  handleInput = (event) => {
    this.setState({ inputText: event.target.value })
  }
  handleSearch = () => {
    this.setState({ tag: this.state.inputText })
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSearch()
    }
  }
  render() {
    let displayNavbar = null
    let displayControlPanel = null
    if (this.state.scrollY > window.innerHeight - 60) {
      displayNavbar = { display: 'flex' }
      displayControlPanel = { display: 'none' }
    }
    if (this.state.galleryWidth <= 680) {
      displayNavbar = { display: 'none' }
    }
    return (
      <div className='app-root'>
        <div className='app-header' style={{ backgroundImage: `url(${PhotoHeader})` }}>
          <div className='text-container'>
            <p>Flickr Gallery</p>
            <h2>Find your inspiration</h2>
          </div>
          <NavBar
            inputText={this.state.inputText}
            handleSearch={this.handleSearch}
            btnClassB={this.state.btnClassB}
            btnClassC={this.state.btnClassC}
            handleInput={this.handleInput}
            displayNavbar={displayNavbar}
            tag={this.state.tag}
            colorfulGallery={this.colorfulGallery}
            blackAndWhiteGallery={this.blackAndWhiteGallery} />
          <div className='app-input'>
            <input
              onKeyPress={this.handleKeyPress}
              className='input'
              style={displayControlPanel}
              onChange={(event) => this.handleInput(event)}
              value={this.state.inputText}
            />
            <a
              className='search-item'
              href='#gallery'
              onClick={this.handleSearch}
            >
              <FontAwesome
                className='image-icon'
                name='search'
                title='search'
              />
            </a>
          </div>
          <div className='btn-container' style={displayControlPanel}>
            <a
              href="#gallery"
              onClick={this.colorfulGallery}
              className={this.state.btnClassC ? 'header-btn-color' : 'header-btn-black'}
            >
              Colorful Gallery
            </a>
            <a
              href="#gallery"
              onClick={this.blackAndWhiteGallery}
              className={this.state.btnClassB ? 'header-btn-color' : 'header-btn-black'}
            >
              B&W Gallery
            </a>
          </div>
        </div>
        <div id='gallery'>
          <Gallery className="gallery" tag={this.state.tag} grayScale={this.state.grayScale} />
        </div>
      </div>
    );
  }
}

export default App;