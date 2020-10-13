import React from 'react';
import { useHistory } from 'react-router-dom';
import SignForm from './SignForm';
import * as auth from '../auth.js';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        props.setTitle({
            name: "Регистрация",
            link: "signup",
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        auth.authorize(email, password)
            .then(data => {
                if (data.token) {
                    props.tokenCheck();
                    history.push('/');
                }
            })
            .catch((err) => console.log(err));

        return;
    }

    return (
        <SignForm
            title="Вход"
            subtitle="Ещё не зарегистрированны? "
            subtitleUrl="Регистрация"
            buttonName="Войти"
            link="signup"
            onSubmit={handleSubmit}
            onEmailChange={e => setEmail(e.target.value)}
            onPassChange={e => setPassword(e.target.value)}
        />
    );
}

export default Login;