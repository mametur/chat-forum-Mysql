var img1 = (new Image().src = '../img/1.png');
var img2 = (new Image().src = '../img/2.png');
var img3 = (new Image().src = '../img/3.png');
var img4 = (new Image().src = '../img/4.png');
var img5 = (new Image().src = '../img/5.png');
var img6 = (new Image().src = '../img/6.png');

import { isEmpty } from './signIn.js';

export const setimage = (event) => {
	const imageIndex = event.target.value;
	if (document.images) {
		const img = (document.images[0].src = eval('img' + imageIndex));
		document.getElementById('va').innerHTML = `<img src=${img} alt = 'icon' class='avatar-img'>`;
	}
};

export const register = async (e) => {
	const username = document.getElementById('user2').value;
	const password = document.getElementById('pass2').value;
	const avatar = document.getElementById('my-select').value;
	const userInfo = {
		name: username,
		password: password,
		avatar: avatar,
	};
	console.log(userInfo);
	if (isEmpty(userInfo.name, userInfo.password)) {
		return;
	}
	try {
		const response = await fetch('/api/register', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo),
		});

		const checkUser = await response.json();

		if (checkUser) {
			alert(userInfo.name + ' username already exists');
			return;
		}
	} catch (err) {
		console.log('my error', err);
	}
};

function check(user) {
	for (const key in user) {
		if (!Boolean(user[key])) {
			alert(`${key}: is required`);
			return false;
		}
	}
	return true;
}

function isUserExistInData(data, name) {
	return data.find((userName) => userName.name === name);
}
