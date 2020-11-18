'use strict';
export let IamOnline = false;

export const signIn = (event) => {
	const username = document.getElementById('user1').value;
	const password = document.getElementById('pass1').value;
	const login_page = document.getElementById('login-wrap');
	const chat_forum = document.getElementById('root');
	const avatar_list = document.getElementById('users-list');
	const chat_box = document.getElementById('chat');

	// throw error for empty input
	if (isEmpty(username, password)) {
		return;
	}

	getUserInfo().then((data) => {
		// check user in database
		const activeUser = isUserExistInData(data.users, username, password);
		console.log('active user', activeUser);
		// if user not exist in the database
		if (!activeUser) {
			alert(`${username.toUpperCase()}, Please sign-up, you have not any account yet`);
		} else {
			/* render chat-forum*/
			// render avatars
			login_page.style.display = 'none';
			chat_forum.style.display = 'block';

			IamOnline = activeUser; // this will help me later for comment to assign avatar and user name

			if (renderAvatars(data.users)) {
				const div = document.createElement('div');
				div.innerHTML = renderAvatars(data.users);
				avatar_list.appendChild(div);
			}

			// render comments
			if (renderComments(data.comments, username)) {
				const divChat = document.createElement('div');
				divChat.innerHTML = renderComments(data.comments, username);
				chat_box.appendChild(divChat);
			}
		}
	});
};
//Fetch get Method
async function getUserInfo() {
	try {
		const response = await fetch('/api/users');
		//if something wrong
		if (!response.ok) {
			const message = `An error has accured: ${response.status}`;
			throw new error(message);
		}
		const usersInfo = await response.json();

		return usersInfo;
	} catch (error) {
		error.message;
	}
}
// check user info is not empty

export function isEmpty(name, password) {
	if (!Boolean(name.trim()) || !Boolean(password.trim())) {
		alert('Please pass your info');
		return true;
	}
}

// check user name and password
function isUserExistInData(data, name, password) {
	return data.find((userName) => {
		return userName.name === name && userName.password === password;
	});
}

// generate users avatar

function renderAvatars(data) {
	let userLists = '';
	if (data) {
		data.forEach((element) => {
			userLists += `<li>
			<img src="/img/${element.avatar}" id='${element.name}' alt="">
			<div>
			  <h2 >${element.name}</h2>
			</div>
			</li>`;
		});
		return userLists;
	}
}

// generate comments

function renderComments(data, userName) {
	let comments = '';
	if (data) {
		data.forEach((element) => {
			comments += `<li class="${userName === element.name ? 'me' : 'you'}" id="${element.id}">
        <div class="entete">
          <span class="status green"></span>
          <h2  class="text-danger">${element.name}</h2>
          <h3 >${element.date}</h3>
        </div>
        <div class="triangle"></div>
        <div class="message" id="user1comment">
		<input type="text" class="text-box" value="${element.comment}" readonly>
		</div>
		<div>
		<button class="btns" data-remove="${element.id}"><i class="far fa-trash-alt" data-remove="${element.id}"></i></button>
	  </div>
      </li>`;
		});

		return comments;
	}
}
