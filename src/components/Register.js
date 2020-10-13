import React from 'react';
import SignForm from './SignForm';

function Register(props) {
    
    React.useEffect(() => {
        props.setTitle({
            name: "Войти",
            link: "signin"
        });
    },[]);

    function handleChangeData(email, password) {
        props.onRegister(email, password);
    }

    return (
        <SignForm
            title="Регистрация"
            subtitle="Уже зарегистрированны? "
            subtitleUrl="Войти"
            buttonName="Зарегистрироваться"
            link="signin"
            onChangeData={handleChangeData}
        />
    );
}

export default Register;