import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function EditAvatarPopup({ isOpen, onPopupClose, onUpdateAvatar, isLoading }) {
	//переменная состояния и реф
	const [value, setValue] = React.useState('');
  const inputRef = React.useRef();
	
	function handleChange(e) {
    setValue(e.target.value);
	}
	
	//изменение аватара
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar(
			inputRef.current.value
		);
		setValue('');
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
		>	
			<input value={value} onChange={handleChange} ref={inputRef} type="url" name="urlavatarinput" id="url-avatar-input" className="popup__text popup__text_type_about" placeholder="Ссылка на аватар" required />
			<span className="popup__error url-avatar-input-error"></span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;