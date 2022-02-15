import React from 'react';

function ImagePopup(props) {
	return (
		<div className={`popup popup_type_image ${props.card && 'popup_opened'}`}>
			<div className="popup__container popup__container_type_image">
				<img className="popup__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
				<p className="popup__description">{props.card && props.card.name}</p>
				<button type="button" className="popup__close-icon" onClick={props.onPopupClose}></button>
			</div>
		</div>
	);
}

export default ImagePopup;