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

		if (checkUser.data.length) {
			alert(userInfo.name + ' username already exists');
			return;
		} else {
			signupMassage(userInfo);
			window.onload = timedRefresh(5000);
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

function signupMassage(user) {
	debugger;
	document.getElementById('login-wrap').style.display = 'none';
	const message = document.getElementById('welcome');
	message.style.display = 'block';
	const innermsg = document.getElementById('signupmsg');
	innermsg.innerHTML = `Welcome ${user.name}! \n Thank you for registering to ChatForum.Please sign-in to join the conversation!`;
}
function timedRefresh(timeoutPeriod) {
	setTimeout('location.reload(true);', timeoutPeriod);
}

export const logout = (e) => {
	e.target;
	window.localStorage.clear();
	window.location.reload();
	window.location.replace('/');
};
