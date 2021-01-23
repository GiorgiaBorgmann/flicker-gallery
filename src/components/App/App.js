import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import PhotoHeader from './img/background-header.jpg'
import NavBar from '../NavBar/NavBar'
import FontAwesome from 'react-fontawesome';

class App extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    addEventListener('scroll', () => {
      document.body.style.setProperty('--scroll', window.pageYOffset);
      this.setState({scrollY: window.pageYOffset})
    }, false);
    this.state = {
      tag: 'art',
      inputText: 'art',
      btnClassC: true,
      btnClassB: false,
      grayScale: true,
      scrollY: 0,
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
  handleInput = (event) => {
    event.preventDefault()
    this.setState({ inputText: event.target.value })
  }

  handleSearch = () => {
    this.setState({ tag: this.state.inputText })
  }

  render() {
    let displayNavbar = null
    let displayControlPanel = null
    if(this.state.scrollY > window.innerHeight - 60) {
      displayNavbar = { display: 'flex' }
      displayControlPanel = {display: 'none'}
    }
    return (
      <div className='app-root'>
        <div className='app-header' style={{ backgroundImage: `url(${PhotoHeader})` }}>
          <div className='text-container'>
            <p>Flickr Gallery</p>
            <h2>Find your inspiration</h2>
          </div>  
          <NavBar inputText={this.state.inputText} handleSearch={this.handleSearch} btnClassB={this.state.btnClassB} btnClassC={this.state.btnClassC} handleInput={this.handleInput} displayNavbar={displayNavbar} tag={this.state.tag} colorfulGallery={this.colorfulGallery} blackAndWhiteGallery={this.blackAndWhiteGallery} />
          <div className='app-input'>
            <input className='input' style={displayControlPanel} onChange={(event) => this.handleInput(event)} value={this.state.inputText} />
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