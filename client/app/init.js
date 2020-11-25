import { register } from './handlers/register.js';
import { setimage } from './handlers/register.js';
import { signIn } from './handlers/signIn.js';
import { leaveComment } from './handlers/leave_comment.js';
import { nightMode } from './handlers/nightmode.js';
import { editComment } from './handlers/edit-comment.js';
import { deleteComment } from './handlers/delete.js';
import { searchByName } from './handlers/search.js';

/*change avatarimages*/
document.getElementById('my-select').addEventListener('change', setimage);

/*sign-up handler*/

document.getElementById('signup').addEventListener('click', register);
document.getElementById('pass2').addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		register();
	}
});

/*Sign-in Handler*/

document.getElementById('sign-in-button').addEventListener('click', signIn);
document.getElementById('pass1').addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		signIn();
	}
});

/*Leave comments handlers */
document.getElementById('submitComment').addEventListener('click', leaveComment);

/*change to the nightmode*/
var checkbox = document.querySelector('input[name=mode]');
checkbox.addEventListener('change', nightMode);

/*edit comment*/
document.getElementById('chat').addEventListener('click', editComment);

/* delete comment*/
document.getElementById('chat').addEventListener('click', deleteComment);

/*Search By Name */
document.getElementById('serchByName').addEventListener('keyup', searchByName);
