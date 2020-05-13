import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../Logo';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('appState')),
        }
    }

    logout (event) {
        event.preventDefault();
        
        let appState = {
            user: {}
        };

        localStorage['appState'] = JSON.stringify(appState);
        this.setState(appState);
    
        return <Redirect to='/' /> // TODO - fix redirection. Currently doesn't return.
    }

    render() {
        return(
            <div className={'wrapper margin--center'}>
                <header role={'masthead'} className={'flex-row site-masthead'}>
                    <Logo />
                    <h1 className={'text-case:upper site-name letter-spacing:large flex-grow'}>Symposium</h1>
                    <nav className={'primary-navigation'}>
                        {!this.state.user.isLoggedIn ?
                            <ul className={'list--inline'}>
                                <li className={'list__item--inline'}>
                                    <Link className='list__link' to='/login'>Login</Link>
                                </li>
                                <li className={'list__item--inline'}>
                                    <Link className='list__link' to='/register'>Register</Link>
                                </li>
                            </ul>
                        :
                            <ul className={'list--inline'}>
                                <li className={'list__item--inline'}>
                                    <Link className='list__link' to='/profile'>Profile</Link>
                                </li>
                                <li className={'list__item--inline'}>
                                    <a className='list__link' href='#' onClick={this.logout.bind(this)}>Log out</a>
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
    user: PropTypes.object,
}

export default Header
