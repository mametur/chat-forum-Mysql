
import { IamOnline } from './signIn.js';


let originText = '';
export const editCommentOnDC = (e) => {
    if(e.target.className !== 'text-box'){
        return
    }
    const parent = e.target.parentElement.parentElement;
    if(!isOwnComment(parent)) return;

   
    originText = e.target.value;
    e.target.removeAttribute('readOnly');
   
}
export const editCommentOnfocus = (e) => {
    if(e.target.className !== 'text-box'){
        return
    }
    
    const parent = e.target.parentElement.parentElement;
    if(!isOwnComment(parent)) return;
    originText = e.target.value;

}

export const editCommentOnBlur = (e) => {
    if(e.target.className !== 'text-box'){
        return
    }
    
    const parent = e.target.parentElement.parentElement;
    if(!isOwnComment(parent)) return;
     let text = e.target.value;
    if(text === null || text === undefined || text === '') {
        alert('Please add your comment');
        e.target.focus();
    }
    else if(text.length < 3){
        alert('Please minimum 3 character');
        e.target.focus();
    }
    else {
        if (text === originText){
            console.log('nothing change')
        }
        else{
            
            console.log(text);
            const today = new Date();
	        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	        const dateTime = date + ' ' + time;
	        let updatedComment = {
		            name: IamOnline.name,
                   comment: originText,
                   editedComment: text,
		           date: dateTime,
                };
                
                update(updatedComment).then(() => {
                    const liEl = e.target.parentElement.parentElement;
                        const hEl = liEl.querySelector('h3');
                        hEl.innerText = updatedComment.date;
                        
                });

                e.target.setAttribute('readOnly', 'true');
                
        }
    }

}

const isOwnComment = (parent) => {
    return parent.className === 'me';
}


// PUT method 
async function update(comment) {
    try {
        const response = await fetch('/api/comment/edit', {
            method: 'PUT',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
    } catch (error) {
        error.message;
    }
}

