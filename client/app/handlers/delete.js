import { IamOnline } from './signIn.js';
async function deleteCommentAPI(id) {
	try {
		await fetch('/api/comment/' + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
		});
		await response.json();
	} catch (error) {
		error.message;
	}
}

export const deleteComment = (e) => {
	if (e.target.id !== 'delete') return;

	const liE2 = e.target.parentElement.parentElement;
	if (liE2.className !== 'me') return;

	const deleteId = liE2.id;
	const context = e.target.parentElement.parentElement.children[2].children[0].value;

	const deleteDetails = {
		name: IamOnline[0].name,
		comment_id: deleteId,
		comment: context,
	};
	console.log('Deleted object', deleteDetails);
	swal({
		title: 'Are you sure?',
		text: 'Do you really want to delete the comment?',
		icon: 'warning',
		buttons: true,
		dangerMode: true,
	}).then((willDelete) => {
		if (willDelete) {
			swal('Poof! The comment has been deleted!', {
				icon: 'success',
			});

			if (deleteCommentAPI(deleteId)) {
				liE2.remove();
			}
		} else {
			swal(' you are right,It is saying what it should!');
		}
	});
};
