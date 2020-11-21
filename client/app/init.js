import { register } from './handlers/register.js';
import { setimage } from './handlers/register.js';
import { signIn } from './handlers/signIn.js';
import { leaveComment } from './handlers/leave_comment.js';
import {nightMode } from './handlers/nightmode.js'

/*change avatarimages*/
document.getElementById('my-select').addEventListener('change', setimage);

/*sign-up handler*/

document.getElementById('signup').addEventListener('click', register);


/*Sign-in Handler*/

document.getElementById('sign-in-button').addEventListener('click', signIn);

/*Leave comments handlers */
/* document.getElementById('submitComment').addEventListener('click', leaveComment);

/*change to the nightmode*/
 var checkbox = document.querySelector('input[name=mode]');
      checkbox.addEventListener('change', nightMode);