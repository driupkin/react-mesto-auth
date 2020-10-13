import React from 'react';

function SignForm(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePassChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onChangeData(email, password);
    }

    return (
        <section className="sign">
            <div className="sign__container">
                <h2 className="sign__title">{props.title}</h2>
                <form className="sign-form" onSubmit={handleSubmit}>
                    <fieldset className="sign-form__field">
                        <input
                            value={email}
                            onChange={handleEmailChange}
                            name="email"
                            placeholder="Email"
                            className="sign-form__input"
                            type="text"
                            id="place-input"
                            required
                            minLength="1"
                            maxLength="30"
                        />
                        <input
                            value={password}
                            onChange={handlePassChange}
                            name="password"
                            placeholder="Пароль"
                            className="sign-form__input"
                            type="password"
                            id="place-input"
                            required
                            minLength="8"
                            maxLength="30"
                        />
                    </fieldset>
                    <button
                        type="submit"
                        className="sign-form__button"
                        onClick={props.onClick}>
                        {props.buttonName}
                    </button>
                </form>
                <h3 className="sign__subtitle">{props.subtitle}
                    <a className="sign__link" href={`/${props.link}`}>{props.subtitleUrl}</a>
                </h3>
            </div>
        </section>
    );
}

export default SignForm;