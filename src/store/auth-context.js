import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    showLogin: false,
    showRegister: false,
    onLogin: (email, password) => {},
    onRegister: (email, password) => {},
    onLogout: () => {},
    onShowRegister: () => {},
    onShowLogin: () => {}
})

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInInformation === '1') {
        setIsLoggedIn(true);
        }
    }, []);

    const showRegisterHandler = () => {
        setShowRegister(true)
    }

    const showLoginHandler = () => {
        setShowLogin(true)
    }

    const registerHandler = (email, password) => {
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    const loginHandler = (email, password) => {
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        setIsLoggedIn(false)
        setShowLogin(false)
        setShowRegister(false);
    };
    return ( 
        <AuthContext.Provider
            value = {{
                isLoggedIn: isLoggedIn,
                showLogin: showLogin,
                showRegister: showRegister,
                onLogin: loginHandler,
                onRegister: registerHandler,
                onLogout: logoutHandler,
                onShowLogin: showLoginHandler,
                onShowRegister: showRegisterHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;