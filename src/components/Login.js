import React from 'react';
import SignForm from './SignForm';

function Login(props) {

    React.useEffect(() => {
        props.setTitle({
            name: "Регистрация",
            link: "signup",
        });
    }, []);

    function handleChangeData(email, password) {
        props.onLogin(email, password);
    }

    return (
        <SignForm
            title="Вход"
            subtitle="Ещё не зарегистрированны? "
            subtitleUrl="Регистрация"
            buttonName="Войти"
            link="signup"
            onChangeData={handleChangeData}
        />
    );
}

export default Login;