'use strict';
import { IamOnline } from './signIn.js';

export const leaveComment = (event) => {
	event.preventDefault();
	const myComment = document.getElementById('myComment').value;
	const chat_box = document.getElementById('chat');

	// check empty comments
	if (isEmpty(myComment)) {
		alert('Please write something before submit');
		return;
	}

	let my_comment = {
		name: IamOnline[0].name,
		id: IamOnline[0].user_id,
		comment: myComment,
	};

	leaveNewComment(my_comment).then((leavedComment) => {
		const liChat = document.createElement('li');
		liChat.className = 'me';
		liChat.id = leavedComment.comment[0].comment_id;
		liChat.innerHTML = renderComments(leavedComment.comment[0], my_comment);
		chat_box.firstElementChild.appendChild(liChat);
		document.getElementById(`${leavedComment.comment[0].comment_id}`).scrollIntoView();
		//https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
		//https://www.w3schools.com/jsref/met_element_scrollintoview.asp
		document.getElementById('myComment').value = '';
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
		const response = await fetch('/api/comment', {
			method: 'POST',
			body: JSON.stringify(comment),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		});

		const myComment = await response.json();

		return myComment;
	} catch (error) {
		error.message;
	}
}

// generate comments

function renderComments(data, user) {
	let comments = `
        <div class="entete">
          <span class="status green"></span>
          <h2  class="text-danger">${user.name}</h2>
          <h3 >${data.data}</h3>
        </div>
        <div class="triangle"></div>
        <div class="message" >
		<textarea rows="1" type="text" class="text-box" readonly> ${user.comment}</textarea>
		</div>
		<div class='share-button' id="${data.comment_id}">
		 <span> <i class="fas fa-ellipsis-h"></i></span>
		<button class="btns"  id ="delete" ><i class="far fa-trash-alt" data-remove="${data.comment_id}"></i></button>
		<button class="btns"  id ="edit"><i class="fas fa-edit"id ="edit" data-remove="${data.comment_id}"></i></button>
	  </div>
	  </div>
      `;
	return comments;
}
