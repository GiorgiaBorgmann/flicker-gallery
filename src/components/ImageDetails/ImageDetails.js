import React from 'react';
import './ImageDetails.scss';
import FontAwesome from 'react-fontawesome';
class ImageDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    urlFromDto(dto) {
        return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
    }

    render() {

        return (
            <div className="modal-container">
                <h2>{this.props.dto.title}</h2>
                <img src={`${this.urlFromDto(this.props.dto)}`} />
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
            </div>
        )
    }
}

export default ModalImage;