import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_${props.name}`}>
                <form
                    className={`form form_${props.name}`}
                    name={`popup_${props.name}`}
                    method="GET"
                    action="#"
                    onSubmit={props.onSubmit} >
                    <button
                        onClick={props.onClose}
                        type="button"
                        className={`popup__close popup__close_${props.name}`}>
                    </button>
                    {props.image}                    
                    <h2 className={`form__title form__title_${props.name}`}>{props.title}</h2>
                    {props.children}
                    <button
                        type="submit"
                        className={`form__button form__button_${props.name}`}
                        onClick={props.onClose}>
                        {props.buttonName}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;