import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Notification extends Component {
    render() {
        return(
            <div className={`notification notification--${this.props.type}`}>
                <div />
                <div>
                    {this.props.title !== '' ?
                        <p><strong>{this.props.title}</strong></p>
                    : null}
                    {Array.isArray(this.props.content) && this.props.content.length > 1 ?
                        <ul>
                            {this.props.content.map((message, i) =>
                                <li key={i}>{message}</li>
                            )}
                        </ul>
                    :
                        <p>{this.props.content}</p>
                    }
                </div>
            </div>
        )
    }
}

Notification.propTypes = {
    title: PropTypes.string,
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
}

export default Notification;