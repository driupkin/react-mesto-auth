import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import '../blocks/root/root.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { apiMe, apiCards } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { CardsContext } from '../context/CardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip';
import PopupDeleteCard from './PopupDeleteCard';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [isDelCardPopupOpen, setIsDelCardPopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState();
  const [isResStatusOk, setIsResStatusOk] = React.useState();
  const [headerTitle, setHeaderTitle] = React.useState({
    name: '',
    link: '',
    email: ''
  }); console.log(headerTitle);

  const history = useHistory();

  React.useEffect(() => tokenCheck(), [loggedIn]);

  React.useEffect(() => {
    apiMe.getData()
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    apiCards.getData()
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    function closeAllPopupsByOverlay(e) {
      if (e.target.classList.contains('popup_opened'))
        closeAllPopups();
    }
    document.addEventListener('mousedown', closeAllPopupsByOverlay);

    function closeAllPopupsByEsc(e) {
      if (e.key === 'Escape')
        closeAllPopups();
    }
    document.addEventListener('keydown', closeAllPopupsByEsc);

    return () => {
      document.removeEventListener('mousedown', closeAllPopupsByOverlay);
      document.removeEventListener('keydown', closeAllPopupsByEsc);
    }
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltip(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(values) {
    apiMe.editProfile(values)
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(url) {
    apiMe.changeAvatar(url.avatar)
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(values) {
    apiCards.addCard(values)
      .then(newCard => setCards([...cards, newCard]))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    (isLiked ? apiCards.deleteLike(card._id) : apiCards.putLike(card._id))
      .then(newCard => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    apiCards.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(item => item._id === card._id ? '' : item);
        setCards(newCards);
      }
      );
  }


  function tokenCheck() {
    console.log(loggedIn);
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            console.log(res.data);
            setHeaderTitle({
              name: "Выйти",
              link: "signin",
              email: res.data.email
            })
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSubmitRegister(value) {
    setIsInfoTooltip(value);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="root">
          <div className="page">
            <Header title={headerTitle} />
            <Switch>

              <ProtectedRoute exact path="/"
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                setCards={setCards}
              >
              </ProtectedRoute>

              <Route path="/signup">
                <Register
                  submitRegister={handleSubmitRegister}
                  setStatus={(value => setIsResStatusOk(value))}
                  loggedIn={value => setLoggedIn(value)}
                  setTitle={value => setHeaderTitle(value)}
                />
              </Route>

              <Route path="/signin">
                <Login
                  setTitle={value => setHeaderTitle(value)}
                  loggedIn={value => setLoggedIn(value)}
                  tokenCheck={tokenCheck}
                />
              </Route>

            </Switch>
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupDeleteCard
            isOpen={isDelCardPopupOpen}
          />
          <ImagePopup
            card={selectedCard}
            link={selectedCard.link}
            name={selectedCard.name}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            isStatusTitleOk={isResStatusOk}
            isStatusIconOk={isResStatusOk}
          />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider >
  );
}

export default App;