'use strict';
import { listOfUsers } from './signIn.js';

export const searchByName = (event) => {
	const text = document.getElementById('serchByName').value.toLowerCase();
	const divTag = document.getElementById('sortBySearch');
	const users = listOfUsers;
	removeUsersList(divTag);
	for (const liElement of users) {
		if (liElement.name.toLowerCase().includes(text)) {
			divTag.prepend(renderAvatars(liElement));
		} else {
			divTag.append(renderAvatars(liElement));
		}
	}
};

const removeUsersList = (lists) => {
	while (lists.firstElementChild) {
		lists.firstElementChild.remove();
	}
};
function renderAvatars(user) {
	let userLists = '';
	userLists += `<img src="/img/${user.avatar}.png" id='${user.name}' alt="">
	    <div>
	    <h2 >${user.name}</h2>
	    </div>`;
	const li = document.createElement('li');
	li.innerHTML = userLists;
	return li;
}
