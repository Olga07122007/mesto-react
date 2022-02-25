import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onPopupClose, card, onCardDelete }) {
	
	//удаление карточки
	function handleSubmit(e) {
		e.preventDefault();
		onCardDelete(card);
	} 
	
	return (
		<PopupWithForm 
			title="Вы уверены?" 
			name="confirm"
			buttonSave="Да"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
		>
		</PopupWithForm>
	);
}

export default ConfirmPopup;