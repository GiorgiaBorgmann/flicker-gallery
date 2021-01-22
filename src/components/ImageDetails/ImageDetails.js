import React from 'react';
import PropTypes from 'prop-types';
import './ImageDetails.scss';

class ImageDetails extends React.Component {
    static propTypes = {
        dto: PropTypes.object
    };

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
            </div>
        )
    }
}

export default ModalImage;