import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
	{/*переменные состояния, отвечающие за видимость попапов*/}
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
	const [selectedCard, setSelectedCard] = React.useState(null)
	
	{/*функция открытия попапа редактирования профиля*/}
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}
	
	{/*функция открытия попапа добавления карточки*/}
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}
	
	{/*функция открытия попапа редактирования профиля*/}
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}
	
	{/*функция закрытия для всех попапов*/}
	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard(null);
	}
	
	function handleCardClick(card) {
		setSelectedCard(card);
	}
	
	return (
		<div className="page">
			<Header />
			<Main
				/*обработчики*/	
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
				onCardClick={handleCardClick}
			/>
			<Footer />
			
			{/*попап редактирования профиля*/}
			<PopupWithForm 
				title="Редактировать профиль" 
				name="edit"
				buttonSave="Сохранить"
				isOpen={isEditProfilePopupOpen}
				onPopupClose={closeAllPopups}
				children={(
					<>
						<input type="text" name="nameinput" id="name-input" className="popup__text popup__text_type_name" placeholder="Имя" required minLength="2" maxLength="40" />
						<span className="popup__error name-input-error"></span>
						<input type="text" name="jobinput" id="job-input" className="popup__text popup__text_type_about" placeholder="Профессиональная деятельность" required minLength="2" maxLength="200" />
						<span className="popup__error job-input-error"></span>
					</>
				)}
			/>
			
			{/*попап добавления нового места*/}
			<PopupWithForm 
				title="Новое место"
				name="add"
				buttonSave="Создать"
				isOpen={isAddPlacePopupOpen}
				onPopupClose={closeAllPopups}
				children={(
					<>
						<input type="text" name="titleinput" id="title-input" className="popup__text popup__text_type_name" placeholder="Название" required minLength="2" maxLength="30" />
						<span className="popup__error title-input-error"></span>
						<input type="url" name="urlinput" id="url-input" className="popup__text popup__text_type_about" placeholder="Ссылка на картинку" required />
						<span className="popup__error url-input-error"></span>
					</>
				)}
			/>
			
			{/*попап обновления аватара*/}
			<PopupWithForm 
				title="Обновить аватар" 
				name="avatar"
				buttonSave="Сохранить"
				isOpen={isEditAvatarPopupOpen}
				onPopupClose={closeAllPopups}
				children={(
					<>
						<input type="url" name="urlavatarinput" id="url-avatar-input" className="popup__text popup__text_type_about" placeholder="Ссылка на аватар" required />
						<span className="popup__error url-avatar-input-error"></span>
					</>
				)}
			/>
			
			{/*попап перед удалением карточки*/}
			<PopupWithForm 
				title="Вы уверены?" 
				name="confirm"
				buttonSave="Да"
				children={(
					<>
					</>
				)}
			/>
			
			{/*попап с картинкой*/}
			<ImagePopup 
				card={selectedCard}
				onPopupClose={closeAllPopups}
			/>
			
		</div>
	);
}

export default App;
