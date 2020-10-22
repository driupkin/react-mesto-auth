import { BASE_URL } from './auth';

class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }
    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            console.log('_handleResponse rejection')
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    _handleResponseError(err) {
        console.log('_handleResponseError')
        return Promise.reject(err.message)
    }
    getData() {
        return fetch(this.url, { headers: this.headers })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    editProfile(values) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: values.name,
                about: values.about
            })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    addCard(values) {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: values.name,
                link: values.link
            })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    deleteCard(id) {
        return fetch(
            `${this.url}/${id}`,
            {
                headers: this.headers,
                method: 'DELETE',
            })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    putLike(id) {
        return fetch(
            `${this.url}/likes/${id}`,
            {
                headers: this.headers,
                method: 'PUT',
            })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    deleteLike(id) {
        return fetch(
            `${this.url}/likes/${id}`,
            {
                headers: this.headers,
                method: 'DELETE',
            })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    changeAvatar(avatar) {
        return fetch(
            `${this.url}/avatar`,
            {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar
                })

            })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
}

const apiMe = new Api({
    // url: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me',
    url: `${BASE_URL}/users/me`,
    headers: {
        // authorization: '719abc6c-853b-49cf-a6ae-f91d269216f8',
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
    }
});

const apiCards = new Api({
    // url: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
    url: `${BASE_URL}/cards`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
    }
});

export { apiMe, apiCards };