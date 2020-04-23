import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeletionWarning extends Component {
    dismissWarning(event) {
        this.props.visibilityMethod(false, this.props.type, event);
    }

    deleteEntity(event) {
        this.props.deletionMethod(this.props.id, event);
    }

    render() {
        return(
            <div>
                {this.props.type === 'section' ?
                    <div>
                        {/* TODO - section selection component */}
                        Select which section to move all posts to
                    </div>
                : null}
                Are you sure you want to delete this {this.props.type}?
                <div>
                    <button onClick={this.deleteEntity.bind(this)}>Yes, delete</button>
                    <button onClick={this.dismissWarning.bind(this)} value={false}>No, nevermind</button>
                </div>
            </div>
        )
    }
}

DeletionWarning.propTypes = {
    type: PropTypes.oneOf(['section', 'topic', 'post', 'reply']),
    id: PropTypes.number.isRequired,
    deletionMethod: PropTypes.func.isRequired,
    visibilityMethod: PropTypes.func.isRequired,
}

export default DeletionWarning;
