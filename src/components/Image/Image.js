import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      size: 200,
      rotation: 0
    }
  }

  calcImageSize = () => {
    const { galleryWidth } = this.props;
    const targetSize = 250;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = Math.round(galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }
  componentDidMount() {
    this.calcImageSize();
  }
  urlFromDto = (dto) => {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }
  rotateImage = () => {
    this.setState({ rotation: this.state.rotation + 90 })
  }

  render() {
    return (
      <div className='image-root'
        draggable
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
        style={{
          height: this.state.size + 'px'
        }}>
        <div
          className={'rotate'}
          style={{
            backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
            width: '100%',
            height: this.state.size + 'px',
            position: 'absolute',
            top: 0,
            right: 0,
            transform: `rotate(${this.state.rotation}deg)`,
            filter: `${this.props.grayScale ? 'grayScale(0%)' : 'grayScale(100%)'}`
          }}
        >
        </div>
        <div className='control-panel'>
          <FontAwesome onClick={this.rotateImage}
            className='image-icon' name='sync-alt' title='rotate' />
          <FontAwesome
            onClick={() => this.props.deleteImage(this.props.dto.id)}
            className='image-icon' name='trash-alt' title='delete'
          />
          <FontAwesome
            onClick={() => this.props.onImageSelect(this.props.imageIndex)}
            className='image-icon'
            name='expand'
            title='expand'
          />
        </div>
      </div>
    );
  }
}

export default Image;