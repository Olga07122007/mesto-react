//обработка ошибок
const onError = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

//класс Api
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
		this._headers = headers;
	};
	
	//отображение начального профиля
	getBasicInformation() {
		return fetch (`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._headers.authorization
			}
		})
		.then (onError);
	};
	
	//добавление массива элементов при загрузке страницы
  getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: this._headers.authorization
			}
		})
		.then (onError);
	};
	
	//вся информация о пользователе и о карточках
	getAppInfo() {
    return Promise.all([this.getBasicInformation(), this.getInitialCards()]);
  }; 
	
	//добавление карточки пользователем
	addCard(titleinput, urlinput) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
			body: JSON.stringify({
				name: titleinput,
				link: urlinput
			})
		})
		.then (onError);
	};
	
	//удаление карточки
	deleteCard(deleteId) {
		return fetch(`${this._baseUrl}/cards/${deleteId}`, {
			method: 'DELETE',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
		})
		.then (onError);
	};
	
	//изменение аватара
	editAvatar(urlavatarinput) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
			body: JSON.stringify({
				avatar: urlavatarinput,
			})
		})
		.then (onError);	
	};
	
	//изменение информации о пользователем
	editProfile(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
		.then (onError);	
	};
	
	//добавление и удаление лайка
	changeLikeCardStatus(likeId, isLiked) {
		return fetch(`${this._baseUrl}/cards/${likeId}/likes`, {
		method: !isLiked ? 'PUT' : 'DELETE',
			headers: {
				authorization: this._headers.authorization,
				'Content-Type': this._headers['Content-Type']
			},
		})
		.then (onError);
	}
}

//создание экземпляра класса api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'a209fba5-6239-47fb-8010-cd146ab13ee2',
    'Content-Type': 'application/json'
  }
});

export default api;