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
import * as auth from '../utils/auth.js';
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
  const [error, setError] = React.useState('Что-то пошло не так!');
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState();
  const [isResStatusOk, setIsResStatusOk] = React.useState();
  const [headerTitle, setHeaderTitle] = React.useState({
    name: '',
    link: '',
    email: ''
  });

  const history = useHistory();

  React.useEffect(() => {
    if (tokenCheck()) {
      getAllContent();
    }
  }, [loggedIn]);

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
    apiMe(tokenCheck()).editProfile(values)
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(url) {
    apiMe(tokenCheck()).changeAvatar(url.avatar)
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(values) {
    apiCards(tokenCheck()).addCard(values)
      .then(newCard => setCards([...cards, newCard]))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    (isLiked
      ? apiCards(tokenCheck()).deleteLike(card._id)
      : apiCards(tokenCheck()).putLike(card._id))
      .then(newCard => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    apiCards(tokenCheck()).deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(item => item._id === card._id ? '' : item);
        setCards(newCards);
      }
      );
  }
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    return jwt;
  }

  function getMyContent() {
    if (tokenCheck()) {
      auth.getContent(tokenCheck(), 'users/me')
        .then((res) => {
          if (res) {
            setHeaderTitle({
              name: "Выйти",
              link: "signin",
              email: res.email
            });
            setCurrentUser(res);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
    return;
  }

  function getAllContent() {
    if (tokenCheck()) {
      auth.getContent(tokenCheck(), 'cards')
        .then(data => {
          // Если пользователь удален, заполняем ключ owner
          data.map(element => {
            if (!element.owner) {
              element.owner = "Пользователь удален!";
            }
          });
          getMyContent();
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  }
  
  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          getAllContent();
        }
      })
      .catch((err) => {
        setError(err);
        setIsResStatusOk(false);
        setIsInfoTooltip(true);
      });

    return;
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(data => {
        if (data) {
          setIsResStatusOk(true);
          setIsInfoTooltip(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        setError(err);
        setIsResStatusOk(false);
        setIsInfoTooltip(true);
      });

    return;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="root">
          <div className="page">
            <Header
              title={headerTitle}
              onSignOut={signOut}
            />
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
                  setTitle={value => setHeaderTitle(value)}
                  onRegister={handleRegister}
                />
              </Route>

              <Route path="/signin">
                <Login
                  setTitle={value => setHeaderTitle(value)}
                  loggedIn={value => setLoggedIn(value)}
                  onLogin={handleLogin}
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
            error={error}
          />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider >
  );
}

export default App;