import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onPopupClose, onAddCard, isLoading, validationButton, setButtonStatus }) {
	//переменные состояния названия и адреса новой карточки
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	//валидация инпутов
	const [validationTitle, setValidationTitle] = useState(false);
	const [validationUrl, setValidationUrl] = useState(false);
	const [valMessageTitle, setValMessageTitle] = useState('');
	const [valMessageUrl, setValMessageUrl] = useState('');
	
	//валидация кнопки отправки формы
	useEffect(() => {
		setButtonStatus([validationTitle, validationUrl]);
	}, [validationTitle, validationUrl]);
	
	//при открытии попапа
	useEffect(() => {
		setValidationTitle(false);
		setValidationUrl(false);
		setValMessageTitle('');
		setValMessageUrl('');
		setTitle('');
		setUrl('');
	}, [isOpen]);
	
	//управляемые инпуты
	function handleChangeTitle(e) {
    setTitle(e.target.value);
		setValMessageTitle(e.target.validationMessage);
		e.target.validity.valid ? setValidationTitle(true) : setValidationTitle(false);
	}
	
	function handleChangeUrl(e) {
    setUrl(e.target.value);
		setValMessageUrl(e.target.validationMessage);
		e.target.validity.valid ? setValidationUrl(true) : setValidationUrl(false);
	}
	
	//добавление новой карточки
	function handleSubmit(e) {
		e.preventDefault();
		onAddCard(title, url);
	}
  
	return (
		<PopupWithForm 
			title="Новое место"
			name="add"
			buttonSave="Создать"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			validationButton={validationButton}
		>	
			<input type="text" value={title} onChange={handleChangeTitle} name="titleinput" id="title-input" className="popup__text popup__text_type_name" placeholder="Название" required minLength="2" maxLength="30" />
			<span className={`popup__error title-input-error ${!validationTitle ? 'popup__error_active' : ''}`}>{valMessageTitle}</span>
			<input type="url" value={url} onChange={handleChangeUrl} name="urlinput" id="url-input" className="popup__text popup__text_type_about" placeholder="Ссылка на картинку" required />
			<span className={`popup__error url-input-error ${!validationUrl ? 'popup__error_active' : ''}`}>{valMessageUrl}</span>
		</PopupWithForm>
	);
}

export default AddPlacePopup;