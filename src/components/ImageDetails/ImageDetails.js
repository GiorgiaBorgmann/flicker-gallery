import React from 'react';
import './ImageDetails.scss';
import FontAwesome from 'react-fontawesome';

class ImageDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    urlFromDto = (dto) => {
        return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
    }

    render() {
        return (
            <div style={this.props.isImageSelected ? { display: 'flex' } : { display: 'none' }}
                className="image-details-container">
                {this.props.isImageSelected && <div className='image-detail'>
                    <FontAwesome onClick={this.props.closeImageDetail} className='close image-icon' name='times-circle' />
                    <h2>{this.props.images[this.props.selectedImageIndex].title}</h2>
                    <div className='carousel-wrapper'>
                        <FontAwesome
                            className='image-icon carousel-icon'
                            name='angle-left'
                            onClick={this.props.subtractOneIndex} />
                        <img
                            className='image'
                            src={this.urlFromDto(this.props.images[this.props.selectedImageIndex])}
                            style={{
                                width: '80%',
                                height: '50vh',
                                filter: `${this.props.grayScale ? 'grayScale(0%)' : 'grayScale(100%)'}`
                            }}
                        />
                        <FontAwesome
                            className='image-icon carousel-icon'
                            name='angle-right'
                            onClick={this.props.addOneIndex}
                        />
                    </div>
                </div>}
            </div>
        )
    }
}

export default ImageDetails;