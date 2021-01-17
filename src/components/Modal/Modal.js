import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './Modal.scss';

class ModalImage extends React.Component {
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
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                width: '40%',
                height: '80%'
            },
            overlay: {
                backgroundColor: 'rgb(192,192,192, 0.4)'
            }
        };

        return (
            <Modal
                isOpen={this.props.openModal}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="modal-container">
                    <div className="modal-header">
                        <h2>{this.props.dto.title}</h2>
                        <div className="close-button" onClick={this.props.closeModal}>X</div>
                    </div>
                    <img src={`${this.urlFromDto(this.props.dto)}`} />
                </div>

            </Modal>

        )
    }
}

export default ModalImage;