import React from 'react';
import api from '../utils/Api';
import Card from './Card'

function Main(props) {
	const [userName, setUserName] = React.useState('');
	const [userDescription, setUserDescription] = React.useState('');
	const [userAvatar, setUserAvatar] = React.useState('');
	const [cards, setCards] = React.useState([]);
	
	{/*Получение информации от сервера*/}
	React.useEffect(() => {
		api.getAppInfo()
			.then(([userData, cards]) => {
				setUserName(userData.name);
				setUserDescription(userData.about);
				setUserAvatar(userData.avatar);
				setCards(cards);
				
			})
			.catch(err => {
				console.log(`Ошибка: ${err}`);
			}); 	
	}, [])
	
	const imageStyle = { backgroundImage: `url(${userAvatar})` };

	return (
		<main className="main">
			<section className="profile">
				<div className="profile__avatar"  style={imageStyle}  onClick={props.onEditAvatar}></div>
				<div className="profile__info">
					<div className="profile__title-container">
						<h1 className="profile__title">{userName}</h1>
						<button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
					</div>
					<p className="profile__subtitle">{userDescription}</p>
				</div>
				<button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
			</section>
			
			{/*Создание карточек*/}
			<section className="elements">
				{cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						onCardClick={props.onCardClick}
					/>
				))}
			</section>
		</main>
	);
}

export default Main;