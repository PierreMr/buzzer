import React from 'react';

const logo = {
    display: 'block',
    margin: '10px auto',
    width: '100px',
}

const Header = () => (
    <>
        <a href="/">
            <img src={process.env.PUBLIC_URL + '/logobq.png'} alt="Logo Burger Quizz" style={logo} />
        </a>
    </>
);

export default Header;
