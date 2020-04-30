import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo';

const Header = () => (
    <div className={'wrapper margin--center'}>
        <header role={'masthead'} className={'flex-row site-masthead'}>
            <Logo />
            <h1 className={'text-case:upper site-name letter-spacing:large flex-grow'}>Symposium</h1>
            <nav className={'primary-navigation'}>
                <ul className={'list--inline'}>
                    <li className={'list__item--inline'}>
                        <Link className='list__link' to='/login'>Login</Link>
                    </li>
                    <li className={'list__item--inline'}>
                        <Link className='list__link' to='/login'>Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
)

export default Header
