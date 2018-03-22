import React, {Component} from 'react';
import agent from '../../../Helpers/agent';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import history from '../../../Helpers/history.js';


const mapStateToProps = (state, ownProps) => ({
    tags: ownProps.tags,
    type: ownProps.type,
    console_id: state.common.consoleData.console_id,
    campaign: ownProps.campaign
});


const mapDispatchToProps = dispatch => ({
    consoleEndpoint: (key, type, dashboard, endpoint, bundle) => {
        dispatch(agent.FirebaseQuery.consoleEndpoint(key, type, dashboard, endpoint, bundle))
    },
    modalToggle: (value, child) => {
        history.push('campaigns');
        dispatch({
            type: 'MODAL_TOGGLE',
            value: value,
            child: child
        })
    }
});

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
        zIndex: 100,
        border: 'none',
        backgroundColor: 'transparent'
    }
};


class AuthTags extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };
        /*
         this.openModal = this.openModal.bind(this);
         this.afterOpenModal = this.afterOpenModal.bind(this);
         this.closeModal = this.closeModal.bind(this);*/
    }

    removeUserClick = (tag, index) => {
        if (window.confirm('Remove gifting permissions for ' + tag.value + '?') === true) {
            this.props.consoleEndpoint(this.props.console_id, 'remove_campaign_user', this.props.console_id, '/' + this.props.campaign, index)
        }
    };

    modalToggle = (value, child) => {
        this.props.modalToggle(value, child);
    }

    tagsMap = () => {
        return this.props.tags.map((tag, index) => {

            return (
                <div className="pointer tag-default tag-pill no-select"
                     key={index}
                     onClick={()=>this.removeUserClick(tag, index)}>
                    {tag.value} &emsp; <strong>&times;</strong>
                </div>

            );
        })
    }

    render() {
        if (this.props.tags) {
            return (
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                    >
                        <div >Dogs and sal;sdkfj;asldkfj;asdlkfjas;dlf</div>
                    </Modal>
                    <div className="tag-list">
                        {
                            this.tagsMap()
                        }

                        <div
                            onClick={() => this.modalToggle('open', 'user_entry')}
                            className="pointer tag-default tag-pill tag-add">
                            + Add {this.props.type}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="tag-list">
                    <div
                        onClick={() => this.modalToggle('open', 'user_entry')}
                        className="pointer tag-default tag-pill tag-add">
                        + Add {this.props.type}
                    </div>
                </div>
            );
        }

    }

}
;

export default connect(mapStateToProps, mapDispatchToProps)(AuthTags);
