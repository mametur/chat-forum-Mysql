import { register } from './handlers/register.js';
import { setimage } from './handlers/register.js';
import { signIn } from './handlers/signIn.js';
import { leaveComment } from './handlers/leave_comment.js';
import { editCommentOnDC, editCommentOnBlur, editCommentOnfocus } from './handlers/edit-comment.js';
import { deleteMessage } from './handlers/deleteMessage.js';

document.getElementById('my-select').addEventListener('change', setimage);
document.getElementById('signup').addEventListener('click', register);

/*Sign-in Handler*/

document.getElementById('sign-in-button').addEventListener('click', signIn);

/*Leave comments handlers */
document.getElementById('submitComment').addEventListener('click', leaveComment);

//edit comment handler on DB
document.querySelector('#chat').addEventListener('dblclick', editCommentOnDC);

//edit comment handler on Blur
document.querySelector('#chat').addEventListener('focusout', editCommentOnBlur);

//edit comment on focus
document.querySelector('#chat').addEventListener('focusin', editCommentOnfocus);

/* Delete the message from UI */
document.getElementById('chat').addEventListener('click', deleteMessage);
