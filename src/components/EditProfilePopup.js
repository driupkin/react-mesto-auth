import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(el) {
        setName(el.target.value);
    }

    function handleChangeDescription(el) {
        setDescription(el.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title="Редактировать профиль"
            name="edit-profile"
            buttonName="Сохранить"
            children={
                <fieldset className="form__field">
                    <input
                        value={name}
                        name="name"
                        onChange={handleChangeName}
                        placeholder="Имя профиля"
                        className="form__input form__input_name"
                        type="text"
                        id="name-input"
                        required minLength="2"
                        maxLength="40" />
                    <span className='form__input-error' id='name-input-error'></span>
                    <input
                        value={description}
                        name="description"
                        onChange={handleChangeDescription}
                        placeholder="Описание"
                        className="form__input form__input_description"
                        id="description-input"
                        type="text"
                        required minLength="2"
                        maxLength="200" />
                    <span className='form__input-error' id='description-input-error'></span>
                </fieldset>
            } />
    )
}

export default EditProfilePopup;