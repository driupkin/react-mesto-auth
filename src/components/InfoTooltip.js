import React from 'react';
import PopupWithForm from './PopupWithForm';
import iconOk from '../images/status-ok.svg';
import iconError from '../images/status-error.svg';

function InfoTooltip(props) {

    return (
        <PopupWithForm
            name="register"
            title={props.isStatusTitleOk ? `Вы успешно зарегистрировались!` : props.error}
            isOpen={props.isOpen}
            onClose={props.onClose}
            image={
                <img
                    alt="Иконка статуса"
                    src={props.isStatusIconOk ? iconOk : iconError}
                className={`popup__image popup__image_register`}>

                </img>}
        />
    )
}

export default InfoTooltip;