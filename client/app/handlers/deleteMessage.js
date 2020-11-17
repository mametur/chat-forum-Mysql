'use strict';
export const deleteMessage = (event) => {
	const target = event.target;

	if (!target.dataset.remove) {
		return;
	}
	//get id from target element
	const deletedId = target.dataset.remove;
	var removeComment = document.getElementById(deletedId);
	removeComment.remove();

	fetch(`api/delete/${deletedId}`, {
		method: 'delete',
		headers: { 'Content-Type': 'application/json' },
	})
		.then((res) => {
			if (res.ok) {
				throw res;
			}
			return res.json();
		})
		.catch((err) => console.log(err));
};
