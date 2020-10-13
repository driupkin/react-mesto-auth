import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);    

    return (
        <main className="content">
            <section className="profile" id="">
                <div className="profile__avatar_container" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                    <div className="profile__avatar_change" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__button-edit" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__button-add" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map((card, i) => (
                    <Card
                        card={card}
                        onCardLike={props.onCardLike}
                        onCardClick={props.onCardClick}
                        onCardDelete={props.onCardDelete}
                        key={i}
                    />
                ))}
            </section>

        </main>
    );
}

export default Main;