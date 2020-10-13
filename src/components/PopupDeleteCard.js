import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupDeleteCard(props) {

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="delete-cards"
            buttonName="Да"
            isOpen={props.isOpen}
            onClose={props.onClose}
        />
    )

}

export default PopupDeleteCard;