import React from 'react';

function PopupWithForm(props) {
	return (
		<div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened': ''}`}>
				<div className="popup__container">
					<h3 className="popup__title">{props.title}</h3>
						<form name={`form${props.name}`} className="popup__input" noValidate>
							{props.children}
							<button type="submit" className="popup__save-btn" >{props.buttonSave}</button>
						</form>
						<button type="button" className="popup__close-icon" onClick={props.onPopupClose}></button>
				</div>
			</div>
	);
}

export default PopupWithForm;


