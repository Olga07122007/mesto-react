import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';

function ConfirmPopup({ isOpen, onPopupClose, card, onCardDelete, validationButton, setButtonStatus }) {
	//удаление карточки
	function handleSubmit(e) {
		e.preventDefault();
		onCardDelete(card);
	}
		
	//валидация кнопки отправки формы
	useEffect(() => {
		setButtonStatus([true]);
	}, [isOpen]);	
	
	return (
		<PopupWithForm 
			title="Вы уверены?" 
			name="confirm"
			buttonSave="Да"
			isOpen={isOpen}
			onPopupClose={onPopupClose}
			onSubmit={handleSubmit}
			validationButton={validationButton}
		>
		</PopupWithForm>
	);
}

export default ConfirmPopup;