// Modal.js
import React from 'react';
import { createPortal } from 'react-dom';
import './index.less';

// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        // We create an element div for this modal
        this.element = document.createElement('div');
    }
    // We append the created div to the div#modal
    componentDidMount() {
        modalRoot.appendChild(this.element);
    }
    /**
     * We remove the created div when this Modal Component is unmounted
     * Used to clean up the memory to avoid memory leak
     */
    componentWillUnmount() {
        modalRoot.removeChild(this.element);
    }
    render() {
        return createPortal(this.props.children, this.element);
    }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    render() {
        const { showModal } = this.state;

        return (
            <React.Fragment>
                <button className="modal-toggle-button" onClick={this.toggleModal}>
                    {!showModal ? 'Open Modal' : 'Close Modal'}
                </button>
                {showModal ? (
                    <Modal>
                        <h1>Heading</h1>
                        <p>Lorem ipsum </p>
                        <button className="modal-close" onClick={this.toggleModal}>
                            X
                        </button>
                    </Modal>
                ) : null}
            </React.Fragment>
        );
    }
}
