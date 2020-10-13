import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title="Новое место"
            name="add-cards"
            buttonName="Создать"
            children={
                <fieldset className=" form__field">
                    <input
                        ref={nameRef}
                        name="name"
                        placeholder="Название"
                        className="form__input form__input_place"
                        type="text"
                        id="place-input"
                        required
                        minLength="1"
                        maxLength="30"
                    />
                    <span className='form__input-error' id='place-input-error'></span>
                    <input
                        ref={linkRef}
                        name="link"
                        placeholder="Ссылка на картинку"
                        className="form__input form__input_url"
                        type="url"
                        id="url-input"
                        required
                    />
                    <span className='form__input-error' id='url-input-error'></span>
                </fieldset>}
        />
    )
}
export default AddPlacePopup;