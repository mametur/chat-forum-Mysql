var img1 = (new Image().src = '../img/1.png');
var img2 = (new Image().src = '../img/2.png');
var img3 = (new Image().src = '../img/3.png');
var img4 = (new Image().src = '../img/4.png');
var img5 = (new Image().src = '../img/5.png');
var img6 = (new Image().src = '../img/6.png');

export const setimage = (imageselect) => {
	//	debugger;
	const imageIndex = imageselect.options[imageselect.selectedIndex].value;
	if (document.images) {
		const img = (document.images[0].src = eval('img' + imageIndex));
		document.getElementById('va').innerHTML = `<img src=${img} alt = 'icon' class='avatar-img'>`;
	}
};

export const register = async (e) => {
	e.preventDefault();
	//	debugger;
	const username = document.getElementById('user2').value;
	const password = document.getElementById('pass2').value;
	const avatars = document.getElementById('my-select').selectedIndex;
	const avatar = document.getElementsByTagName('option')[avatars].value;

	const user = {
		name: username,
		password: password,
		avatar: `${avatar}.png`,
		active: false,
		ID: false,
	};

	fetch('/api/users')
		.then((res) => {
			if (!res.ok) {
				throw res;
			}
			return res.json();
		})
		.then((files) => {
			console.log(files);
			const isUserExist = isUserExistInData(files.users, username);

			console.log(isUserExist);

			if (isUserExist) {
				alert(`${isUserExist.name} user already in our data base`);
				return;
			} else {
				fetch('/api/users', {
					method: 'POST',
					body: JSON.stringify(user),
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
					},
				})
					.then((res) => {
						if (res.ok) {
							alert(`${username.toUpperCase()}, welcome chat-forum.Please sign-in`);
							window.location.reload();
							return res.json();
						}
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.error(err));
};

function check(user) {
	for (const key in user) {
		if (!Boolean(user[key])) {
			alert(`${key}: is required`);
			return false;
		}
	}
	return true;
}

function isUserExistInData(data, name) {
	return data.find((userName) => userName.name === name);
}
