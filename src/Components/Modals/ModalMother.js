import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import history from '../../Helpers/history.js';


import ProductEntry from '../Modals/ProductEntry';
import UserEntry from '../Modals/UserEntry';

const customStyles = {
    overlay: {
        zIndex: 100
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'initial',
        padding: '0px',
        zIndex: 100,
        height: '100vh',
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%'
    }
};


const mapStateToProps = state => ({
    modal_toggle: state.common.modal_toggle
});

const mapDispatchToProps = dispatch => ({
    modalToggle: (value, child) =>
    {
        dispatch({
            type: 'MODAL_TOGGLE',
            value: value,
            child: child
        })
    }


});


class ModalMother extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }



    componentWillReceiveProps(nextProps) {
        if(nextProps.modal_toggle.value === 'close') {
            this.closeModal();
            this.props.modalToggle(null, null);
        }
        if(nextProps.modal_toggle.value === 'open') {
            this.openModal();
            const listen = history.listen((location, action) => {
                this.closeModal();
                this.props.modalToggle(null,null);
            })

        }

    }



    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        this.props.modalToggle(null,null);
    }


    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <div className="modal-close" onClick={this.closeModal}>
                        <svg viewBox="0 0 12 12">
                            <path fillRule="evenodd"
                                  d="M11.53.47a.75.75 0 0 0-1.061 0l-4.47 4.47L1.529.47A.75.75 0 1 0 .468 1.531l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.061 1.061l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.061-1.061l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.061z"></path>
                        </svg>
                    </div>
                    {this.props.modal_toggle.child === 'product_entry' ? <ProductEntry/> : null}
                    {this.props.modal_toggle.child === 'user_entry' ? <UserEntry/> : null}
                </Modal>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalMother);