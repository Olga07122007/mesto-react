function PopupWithForm({ name, isOpen, title, children, buttonSave, onPopupClose, onSubmit, isLoading, validationButton }) {
	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened': ''}`}>
				<div className="popup__container">
					<h3 className="popup__title">{title}</h3>
						<form name={`form${name}`} className="popup__input" noValidate onSubmit={onSubmit}>
							{children}
							<button type="submit" disabled={`${!validationButton ? 'disabled' : ''}`} className={`popup__save-btn ${!validationButton ? 'popup__save-btn_inactive' : ''}`}>{!isLoading ? buttonSave : 'Сохранение...'}</button>
						</form>
						<button type="button" className="popup__close-icon" onClick={onPopupClose}></button>
				</div>
			</div>
	);
}

export default PopupWithForm;


