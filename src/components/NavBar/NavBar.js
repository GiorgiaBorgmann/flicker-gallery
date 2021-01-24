import React from 'react';
import FontAwesome from 'react-fontawesome';
import './NavBar.scss';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='navbar' style={this.props.displayNavbar}>
                <div className='navbar-flex-container'>
                    <div className='app-input-navbar'>
                        <input
                            className='input-navbar'
                            value={this.props.inputText}
                            onChange={(e) => this.props.handleInput(e)}
                        />
                        <div className='search-icon' onClick={this.props.handleSearch}>
                            <FontAwesome
                                className='image-icon'
                                name='search'
                                title='search'
                            />
                        </div>
                    </div>
                    <div className='btn-container-navbar'>
                        <a
                            onClick={this.props.colorfulGallery}
                            className={this.props.btnClassC ? 'header-btn-color' : 'header-btn-black'}
                        >
                            Colorful Gallery
                        </a>
                        <a
                            onClick={this.props.blackAndWhiteGallery}
                            className={this.props.btnClassB ? 'header-btn-color' : 'header-btn-black'}
                        >
                            B&W Gallery
                            
                        </a>
                        <a href='#gallery' className=' go-to-the-top'>
                            <FontAwesome
                                className='image-icon'
                                name='arrow-circle-up'
                                title='go to the top'
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;