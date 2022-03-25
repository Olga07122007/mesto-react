import { useState, useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onPopupClose, onUpdateAvatar, isLoading, validationButton, setButtonStatus }) {
	//реф
	const inputRef = useRef(null);
	//валидация инпутов
	const [validationUrl, setValidationUrl] = useState(false);
	const [valMessageUrl, setValMessageUrl] = useState('');
	
	//валидация кнопки отправки формы
	useEffect(() => {
		setButtonStatus([validationUrl]);
	}, [validationUrl]);
	
	//при открытии попапа
	useEffect(() => {
		setValidationUrl(true);
		setButtonStatus([false]);
		inputRef.current.value='';
	}, [isOpen]);
	
	//изменение аватара
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar(
			inputRef.current.value
		);
	} 
	
	function setValidation() {
		setValMessageUrl(inputRef.current.validationMessage);
		inputRef.current.validity.valid ? setValidationUrl(true) : setValidationUrl(false);
		setButtonStatus([validationUrl]);
	}
	
	return (
		<PopupWithForm 
			title="Обновить аватар" 
			name="avatar"
			buttonSave="Сохранить"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
			validationButton={validationButton}
		>	
			<input ref={inputRef} onChange={setValidation} type="url" name="urlavatarinput" id="url-avatar-input" className="popup__text popup__text_type_about" placeholder="Ссылка на аватар" required />
			<span className={`popup__error url-avatar-input-error ${!validationUrl ? 'popup__error_active' : ''}`}>{valMessageUrl}</span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;