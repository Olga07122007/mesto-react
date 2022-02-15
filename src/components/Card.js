import React from 'react';

function Card(props) {
	function handleCardClick() {
		props.onCardClick(props.card);
	}
	
	return(
		<article className="element">
			<img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
			<div className="element__title-container">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__like-container">
					<button type="button" className="element__like"></button>
					<p className="element__counter">{props.card.likes.length}</p>
				</div>
			</div>
			<button type="button" className="element__delete "></button>
		</article>
	)
}

export default Card;	