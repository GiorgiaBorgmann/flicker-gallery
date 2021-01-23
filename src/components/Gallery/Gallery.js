import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image/Image';
import ImageDetails from '../ImageDetails/ImageDetails'
import './Gallery.scss';
class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    addEventListener('resize', () => this.setState({ galleryWidth: this.getGalleryWidth() }))
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      page: 1,
      loading: false,
      prevY: 0,
      display: '',
      indexImg: 0,
      prevTag: props.tag,      
      isImageSelected: false,
      selectedImageIndex: -1
    };
  }

  getGalleryWidth() {
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
        if (tag !== this.state.prevTag) {
          this.setState({
            page: 1,
            images: [],
            loading: false,
            prevState: tag
          })
          if (tag === '') {
            this.setState({
              tag: 'art'
            })
          }
        }
        if (res && res.photos && res.photos.photo && res.photos.photo.length > 0 && this.state.page === 1) {
          this.setState({
            images: res.photos.photo,
            loading: false
          });
        }
        else if (res && res.photos && res.photos.photo && res.photos.photo.length > 0 && this.state.page > 1) {
          this.setState({
            images: [...this.state.images, ...res.photos.photo],
            loading: false
          });
        }
      });
  }
  componentWillUnmount() {
    removeEventListener('resize')
  }
  
  componentDidMount() {
    this.getImages(this.props.tag);
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

  componentWillReceiveProps(nextProps) {
    if (this.props.tag !== nextProps.tag) {
      this.getImages(nextProps.tag);
    }
  }

  handleObserver(entities) {
    if (this.props.tag === '') return
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

  deleteImage = (idImg) => {
    const newArrImages = this.state.images.filter((image) => {
      return image.id !== idImg;
    });
    this.setState({ images: newArrImages });
  }


  onImageSelect = (index) => {
    this.setState({
      isImageSelected: true,
      selectedImageIndex: index
    })
}
closeImageDetail = () => {
  this.setState({
      isImageSelected: false
  })
}
subtractOneIndex = () => {
  if (this.state.selectedImageIndex === 0) return
  this.setState({
      selectedImageIndex: this.state.selectedImageIndex - 1
  })
}
addOneIndex = () => {
  if (this.state.selectedImageIndex === this.state.images.length) return
  this.setState({
      selectedImageIndex: this.state.selectedImageIndex + 1
  })
}
  render() {
    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
    const showGallery = !(this.state.galleryWidth <= 680 && this.state.isImageSelected)
    return (
      <div className='gallery-wrapper'>
        <div className='gallery-root' style={showGallery ? null : { display: 'none' }}>
          {
            this.state.images.map((dto, index) => {
              let key = `image-${dto.id}${index}`
              return (
                <li key={key} onDragOver={(e) => this.onDragOver(e, index)}>
                  <Image
                    deleteImage={this.deleteImage}
                    dto={dto}
                    galleryWidth={this.state.galleryWidth}
                    onDragStart={e => this.onDragStart(e, index)}
                    onDragEnd={this.onDragEnd}
                    grayScale={this.props.grayScale}
                    onImageSelect={this.onImageSelect}
                    imageIndex={index}
                  />
                </li>)
            })}
          <div className='loading-text' ref={loadingRef => (this.loadingRef = loadingRef)}>
            <span style={loadingTextCSS}>Loading...</span>
          </div>
        </div>
        <ImageDetails
          images={this.state.images}
          isImageSelected={this.state.isImageSelected}
          selectedImageIndex={this.state.selectedImageIndex}
          closeImageDetail={this.closeImageDetail}
          subtractOneIndex={this.subtractOneIndex}
          addOneIndex={this.addOneIndex}
        />

      </div>

    );
  }
}

export default Gallery;
