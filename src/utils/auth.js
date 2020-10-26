export const BASE_URL = 'https://api.dri.students.nomoreparties.space';

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        console.log('handleResponse rejection')
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

function handleResponseError(err) {
    console.log('handleResponseError')
    return Promise.reject(err.message)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(handleResponse)
    .then(data => {return data})
    .catch(handleResponseError);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(handleResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
        .catch(handleResponseError);
};

export const getContent = (token, rout) => {
    return fetch(`${BASE_URL}/${rout}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(handleResponse)
        .then(data => {return data})
        .catch(handleResponseError);
};