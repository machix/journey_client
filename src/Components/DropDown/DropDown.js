import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({});


class DropDown extends Component {

    constructor(props) {
        super(props);

    }


    listMap = () => {
        return Object.keys(this.props.listItems).map(function (key, index) {

            return (
                <div onClick={() => this.props.listItems[index].handleClick()} key={index} className="list-item">
                    {this.props.listItems[index].name}
                </div>)
        }, this);
    };

    render() {
        return (
            this.props.isOpen === true ? <div className={'dropdown'} style={{right: 0}}> {this.listMap()}</div> : null


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropDown));
