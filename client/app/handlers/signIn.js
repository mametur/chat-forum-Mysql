'use strict';
export let IamOnline = false;

export const signIn = async (e) => {
	debugger;

	const username = document.getElementById('user1').value;
	const password = document.getElementById('pass1').value;
	const login_page = document.getElementById('login-wrap');
	const chat_forum = document.getElementById('root');
	const avatar_list = document.getElementById('users-list');
	const chat_box = document.getElementById('chat');

	const signedPerson = {
		name: username,
		password: password,
	};

	// throw error for empty input
	if (isEmpty(username, password)) {
		return;
	}
	try {
		const usersData = await getUserInfo(signedPerson);

		console.log('check data base ', usersData);
		// check user in database
		const activeUser = Boolean(usersData.user.length);

		// if user not exist in the database
		if (!activeUser) {
			alert(`${username.toUpperCase()}, Please sign-up, you have not any account yet`);
		} else {
			// render chat-forum
			// render avatars
			login_page.style.display = 'none';
			chat_forum.style.display = 'block';

			IamOnline = usersData.user; // this will help me later for comment to assign avatar and user name
			console.log('I am online', IamOnline);

			if (usersData.users.length) {
				const div = document.createElement('div');
				div.innerHTML = renderAvatars(usersData.users);
				avatar_list.appendChild(div);
			}

			// render comments
			if (usersData.comments.length) {
				const divChat = document.createElement('div');
				divChat.innerHTML = renderComments(usersData.comments, signedPerson.name, usersData.users);
				chat_box.appendChild(divChat);
			}
		}
	} catch (err) {
		console.log(err);
	}
};
//Fetch get Method
async function getUserInfo(userInfo) {
	try {
		const response = await fetch('/api/signIn', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo),
		});
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

// generate users avatar

function renderAvatars(data) {
	let userLists = '';
	if (data) {
		data.forEach((user) => {
			userLists += `<li>
			<img src="/img/${user.avatar}.png" id='${user.name}' alt="">
			<div>
			  <h2 >${user.name}</h2>
			</div>
			</li>`;
		});
		return userLists;
	}
}

// generate comments

function renderComments(data, userName, users) {
	let comments = '';
	if (data) {
		data.forEach((comment) => {
			const findCommentUser = users.filter((user) => user.user_id === comment.userID);
			comments += `<li class="${userName === findCommentUser[0].name ? 'me' : 'you'}" id="${comment.comment_id}">
        <div class="entete">
          <span class="status green"></span>
          <h2  class="text-danger">${findCommentUser[0].name}</h2>
          <h3 >${comment.data}</h3>
        </div>
        <div class="triangle"></div>
        <div class="message">
		<input type="text" class="text-box" value="${comment.comment}" readonly>
		</div>
		<div class='share-button'id='bb'>
		 <span> <i class="fas fa-ellipsis-h"></i></span>
		<button class="btn" id= "delete" data-remove="${comment.comment_id}"><i class="far fa-trash-alt" id= "delete" data-remove="${comment.comment_id}"></i></button>
		<button class="btn" id = "edit" data-remove="${comment.comment_id}"><i class="fas fa-edit"id ="edit" data-remove="${comment.comment_id}"></i></button>

	  </div>
	  </li>`;
		});

		return comments;
	}
}
