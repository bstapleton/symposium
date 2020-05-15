import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../Logo';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    logout (event) {
        event.preventDefault();
        const { history } = this.props;
        localStorage.removeItem('symposiumToken');
    
        history.push('/'); // TODO - fix redirection. Currently doesn't return.
    }

    render() {
        return(
            <div className={'wrapper margin--center'}>
                <header role={'masthead'} className={'flex-row site-masthead'}>
                    <Logo />
                    <h1 className={'text-case:upper site-name letter-spacing:large flex-grow'}>Symposium</h1>
                    <nav className={'primary-navigation'}>
                        {this.props.isAuthenticated === true ?
                            <ul className={'list--inline'}>
                                <li className={'list__item--inline'}>
                                    <Link className='list__link' to='/profile'>Profile</Link>
                                </li>
                                <li className={'list__item--inline'}>
                                    <a className='list__link' href='#' onClick={this.logout.bind(this)}>Log out</a>
                                </li>
                            </ul>
                        :
                            <ul className={'list--inline'}>
                                <li className={'list__item--inline'}>
                                    <Link className='list__link' to='/login'>Login</Link>
                                </li>
                                <li className={'list__item--inline'}>
                                    <Link className='list__link' to='/register'>Register</Link>
                                </li>
                            </ul>
                        }
                    </nav>
                </header>
            </div>
        )
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

export default Header
