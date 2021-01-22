import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';
class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      page: 1,
      loading: false,
      prevY: 0,
      display: '',
      indexImg: 0,
      grayScaleStr: 'grayscale(0%)',
      grayValue: ''
    };
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    this.setState({ loading: true });
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&page=${this.state.page}&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios.get(baseUrl + getImagesUrl)
      .then(res => res.data)
      .then(res => {
        if (res && res.photos && res.photos.photo && res.photos.photo.length > 0 && this.props.tag === '') {
          this.setState({ page: 1 })
          this.setState({ images: [] });
          this.setState({ loading: false });

        } else if (res && res.photos && res.photos.photo && res.photos.photo.length > 0 && this.state.page === 1) {
          this.setState({ images: res.photos.photo });
          this.setState({ loading: false });
        }
        else if (res && res.photos && res.photos.photo && res.photos.photo.length > 0 && this.state.page > 1) {
          this.setState({ images: [...this.state.images, ...res.photos.photo] });
          this.setState({ loading: false });
        }
      });
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.changeGrayScale()
    this.setState({
      galleryWidth: document.body.clientWidth
    });
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
    this.changeGrayScale(props.grayScale)
  }

  handleObserver(entities) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.setState(prevState => (
        { page: prevState.page + 1 }
      ), this.getImages(this.props.tag))
    }
    this.setState({ prevY: y });
  }  

  onDragStart = (event, index) => {
    this.draggedItem = this.state.images[index];
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 20, 20);
  };

  onDragOver = (event, index) => {
    event.preventDefault();
    const draggedOverItem = this.state.images[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let images = this.state.images.filter(item => item !== this.draggedItem);
    // add the dragged item after the dragged over item
    images.splice(index, 0, this.draggedItem);
    this.setState({ images });
  };

  onDragEnd = () => {
    this.draggedItem = null;
  };

  changeGrayScale = (grayScale) => {
    if (grayScale) {
      this.setState({
        grayScaleStr: 'grayscale(0%)'
      })
    } else {
      this.setState({
        grayScaleStr: 'grayscale(100%)'
      })
    }
  }

  deleteImage = (idImg) => {
    const newArrImages = this.state.images.filter((image) => {
      return image.id !== idImg;
    });
    this.setState({ images: newArrImages });
  }

  render() {
    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
    return (
      <div className='gallery-root'>
        {
          this.state.images.map((dto, index) => {
            let key = `image-${dto.id}${index}`
            return (
              <li key={key} onDragOver={(e) => this.onDragOver(e, index)}>
                <Image deleteImage={this.deleteImage} dto={dto} galleryWidth={this.state.galleryWidth} onDragStart={e => this.onDragStart(e, index)} onDragEnd={this.onDragEnd} grayScaleStr={this.state.grayScaleStr} />
              </li>)
          })}
        <div className='loading-text' ref={loadingRef => (this.loadingRef = loadingRef)}>
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>

    );
  }
}

export default Gallery;
