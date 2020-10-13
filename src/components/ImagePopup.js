import React from 'react';

function ImagePopup(props) {
    return (
        <section className={`popup popup_cards ${props.card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_card">
                <button type="button" onClick={props.onClose} className="popup__close popup__close_card"></button>
                <img src={`${props.link}`} alt="#" className="popup__image" />
                <p className="popup__subtitle">{props.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;