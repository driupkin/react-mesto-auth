import React from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup(props) {
    const avatarUrlRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarUrlRef.current.value,
        });
    }
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title="Обновить аватар"
            name="change-avatar"
            buttonName="Сохранить"
            children={
                <fieldset className="form__field">
                    <input
                        ref={avatarUrlRef}
                        name="avatar"
                        placeholder="Ссылка на аватар"
                        className="form__input form__input_url"
                        type="url"
                        id="url-input"
                        required
                    />
                    <span className='form__input-error' id='url-input-error'></span>
                </fieldset>
            }
        />
    )
}

export default EditAvatarPopup;