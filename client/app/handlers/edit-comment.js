import { IamOnline } from './signIn.js';

async function update(comment) {
    try {
        await fetch('/api/comment', {
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


export const editComment = (e) => {
    //debugger;
    if(e.target.id !== 'edit'){
        return
    }
    else{
        
        const context = e.target.parentElement.parentElement.children[2].children[0];
      // console.log(parent);
       const liE2 = e.target.parentElement.parentElement;
       if(liE2.className !== 'me') return;
       context.removeAttribute('readonly');
        context.type = 'text';
        const message = e.target.parentElement.parentElement.children[2];
        message.style.backgroundColor= 'red';
        
        
        context.onkeyup = function (e){
            if (e.keyCode === 13) {
		const text = context.value;
           // console.log(text)
            
            const today = new Date();
	        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	        const dateTime = date + ' ' + time;
	        let updatedComment = {
		            name: IamOnline[0].name,
                   comment_id:liE2.id,
                   comment: text,
		           date: dateTime,
                };
                console.log('updated-comment',updatedComment);
    update(updatedComment).then(() => {
                    const liEl = e.target.parentElement.parentElement;
                        const hEl = liEl.querySelector('h3');
                        hEl.innerText = `updated ${updatedComment.date}`;
                        
                });

                e.target.setAttribute('readOnly', 'true');
                
                
        }
       message.style.backgroundColor= '#6fbced';
	};
        
        }
       
    };