'use strict';
import { IamOnline } from './signIn.js';

export const leaveComment = (event) => {
	const myComment = document.getElementById('myComment').value;
	const chat_box = document.getElementById('chat');

	// check empty comments
	if (isEmpty(myComment)) {
		alert('Please write something before submit');
		return;
	}
	//creating unique ID
	function create_UUID() {
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
		return uuid;
	}
	//Send user comment to data base
	const today = new Date();
	const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	const dateTime = date + ' ' + time;
	let my_comment = {
		name: IamOnline.name,
		comment: myComment,
		date: dateTime,
		id: create_UUID(),
	};

	leaveNewComment(my_comment).then((data) => {
		// render comments
		if (renderComments(my_comment)) {
			const liChat = document.createElement('li');
			liChat.className = 'me';
			liChat.id = my_comment.id;
			liChat.innerHTML = renderComments(my_comment);
			chat_box.firstElementChild.appendChild(liChat);
		}
	});
};

// check user empty comment

function isEmpty(comment) {
	if (!Boolean(comment.trim())) {
		return true;
	}
}
// Post Method
async function leaveNewComment(comment) {
	try {
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify(comment),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		});
	} catch (error) {
		error.message;
	}
}

// generate comments

function renderComments(data) {
	let comments = `
        <div class="entete">
          <span class="status green"></span>
          <h2  class="text-danger">${data.name}</h2>
          <h3 >${data.date}</h3>
        </div>
        <div class="triangle"></div>
        <div class="message" id="user1comment">
		<input type="text" class="text-box" value="${data.comment}" readonly>
		</div>
		<div>
		<button class="btns" data-remove="${data.id}" ><i class="far fa-trash-alt" data-remove="${data.id}"></i></button>
	  </div>
      `;

	return comments;
}
