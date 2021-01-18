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
      prevY: 0
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
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0 &&
          this.props.tag === ''
        ) {
          this.setState({ page: 1 })
          this.setState({ images: [] });
          this.setState({ loading: false });

        } else if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0 &&
          this.state.page === 1
        ) {
          this.setState({ images: res.photos.photo });
          this.setState({ loading: false });
        }
        else if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0 &&
          this.state.page > 1
        ) {
          this.setState({ images: [...this.state.images, ...res.photos.photo] });
          this.setState({ loading: false });
        }
      });
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
  handleObserver(entities) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.setState(prevState => (
        {
          page: prevState.page + 1
        }
      ), this.getImages(this.props.tag))
    }
    this.setState({ prevY: y });
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  render() {
    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
    const loadingCSS = {
      height: '100px',
      margin: '30px',
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    };
    return (

      <div className='gallery-root'>
          {this.state.images.map((dto, index) => {
            let key = `image-${dto.id}${index}`
            return <Image key={key} dto={dto} galleryWidth={this.state.galleryWidth} />;
        })}

        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>

    );
  }
}

export default Gallery;
