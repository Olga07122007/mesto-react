import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onPopupClose, onUpdateUser, isLoading, validationButton, setButtonStatus }) {
	//подписка
	const currentUser = useContext(CurrentUserContext);
	//переменные состояния имени и профессии
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	//валидация инпутов
	const [validationName, setValidationName] = useState(true);
	const [validationAbout, setValidationAbout] = useState(true);
	const [valMessageName, setValMessageName] = useState('');
	const [valMessageAbout, setValMessageAbout] = useState('');
	
	//запись значений в инпуты
	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);
	
	//валидация кнопки отправки формы
	useEffect(() => {
		setButtonStatus([validationName, validationAbout]);
	}, [validationName, validationAbout, isOpen]);
	
	//управляемые инпуты
	function handleChangeName(e) {
    setName(e.target.value);
		setValMessageName(e.target.validationMessage);
		e.target.validity.valid ? setValidationName(true) : setValidationName(false);
	}
	
	function handleChangeAbout(e) {
    setDescription(e.target.value);
		setValMessageAbout(e.target.validationMessage);
		e.target.validity.valid ? setValidationAbout(true) : setValidationAbout(false);
	}
	
	//изменение профиля пользователя
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name: name,
			about: description,
		});
	} 
	
	return (
		<PopupWithForm 
			title="Редактировать профиль" 
			name="edit"
			buttonSave="Сохранить"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			validationButton={validationButton}
		>
			<input type="text" value={name||''} onChange={handleChangeName} name="nameinput" id="name-input" className="popup__text popup__text_type_name" placeholder="Имя" required minLength="2" maxLength="40" />
			<span className={`popup__error name-input-error ${!validationName ? 'popup__error_active' : ''}`}>{valMessageName}</span>
			<input type="text" value={description||''} onChange={handleChangeAbout} name="jobinput" id="job-input" className="popup__text popup__text_type_about" placeholder="Профессиональная деятельность" required minLength="2" maxLength="200" />
			<span className={`popup__error job-input-error ${!validationAbout ? 'popup__error_active' : ''}`}>{valMessageAbout}</span>
		</PopupWithForm>
	);
}
//"popup__error name-input-error popup__error_active"
//
export default EditProfilePopup;