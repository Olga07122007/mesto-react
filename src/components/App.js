import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmPopup from './ConfirmPopup'
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
	//переменные состояния, отвечающие за видимость попапов
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	//для ImagePopup
	const [selectedCard, setSelectedCard] = useState(null);
	//данные пользователя
	const [currentUser, setCurrentUser] = useState({});
	//переменная состояния для массива с карточками
	const [cards, setCards] = useState([]);
	//кнопка сохранения при загрузке данных на сервер
	const [isLoading, setIsLoading] = useState(false);
	//карточка для удаления
	const [selectedCardDelete, setSelectedCardDelete] = useState(null);
	
	//отображение начального профиля и загрузка элементов на страницу
	useEffect(() => {
		api.getAppInfo()
			.then(([userData, cards]) => {
				setCurrentUser(userData);
				setCards(cards);
			})
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			}); 	
	}, [])
	
	//функция открытия попапа редактирования профиля
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	
	//функция открытия попапа добавления карточки
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	
	//функция открытия попапа редактирования профиля
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	
	//функция открытия попапа перед удалением карточки
	function handleConfirmClick(card) {
		setIsConfirmPopupOpen(true);
		setSelectedCardDelete(card);
	}
	
	//функция закрытия для всех попапов
	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard(null);
		setSelectedCardDelete(null);
	}
	
	//клик по картинке
	function handleCardClick(card) {
		setSelectedCard(card);
	}
	
	//Лайк
	function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, isLiked)
				.then((newCard) => {
					setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
				})
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			});
	}
	
	//Удаление карточки
	function handleCardDelete(card) {
    api.deleteCard(card._id)
			.then((newCard) => {
				setCards((state) => state.filter(function(item) {
					return item._id!==card._id 
				}));
				closeAllPopups();
			})
		.catch(err => {
			console.log(`Ошибка: ${err}`);
		});
	}
	
	//Добавление карточки
	function handleAddPlaceSubmit(titleinput, urlinput) {
		setIsLoading(true);
		api.addCard(titleinput, urlinput)
			.then((newCard) => {
				setCards([newCard, ...cards]);
			})
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => {
				setIsLoading(false);
				closeAllPopups();
			});
	}
	
	//обновление профиля
	function handleUpdateUser(data) {
		setIsLoading(true);
		api.editProfile(data)
		.then(result => {
			setCurrentUser(result);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		})
		.finally(() => {
			setIsLoading(false);
			closeAllPopups();
		});
	}
	
	//обновление аватара
	function handleUpdateAvatar(data) {
		setIsLoading(true);
		api.editAvatar(data)
		.then(result => {
			setCurrentUser(result);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		})
		.finally(() => {
			setIsLoading(false);
			closeAllPopups();
		});
	}
	
	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Header />
				<Main
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onConfirm={handleConfirmClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					cards={cards}
				/>
				<Footer />
				
				{/*попап редактирования профиля*/}
				<EditProfilePopup 
					isOpen={isEditProfilePopupOpen} 
					onPopupClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}	
				/>
				
				{/*попап добавления нового места*/}
				<AddPlacePopup 
					isOpen={isAddPlacePopupOpen} 
					onPopupClose={closeAllPopups}
					onAddCard={handleAddPlaceSubmit}
					isLoading={isLoading}
				/>
				
				{/*попап обновления аватара*/}
				<EditAvatarPopup 
					isOpen={isEditAvatarPopupOpen} 
					onPopupClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}	
				/> 
				
				{/*попап перед удалением карточки*/}
				<ConfirmPopup
					isOpen={isConfirmPopupOpen}
					onPopupClose={closeAllPopups}
					card={selectedCardDelete}
					onCardDelete={handleCardDelete}
				/>
				
				{/*попап с картинкой*/}
				<ImagePopup 
					card={selectedCard}
					onPopupClose={closeAllPopups}
				>
				</ImagePopup>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
