import React from 'react';

function SignForm(props) {
    return (
        <section className="sign">
            <div className="sign__container">
                <h2 className="sign__title">{props.title}</h2>
                <form className="sign-form" onSubmit={props.onSubmit}>
                    <fieldset className="sign-form__field">
                        <input
                            onChange={props.onEmailChange}
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
                            onChange={props.onPassChange}
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