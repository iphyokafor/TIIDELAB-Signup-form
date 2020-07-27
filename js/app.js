const loginFormButton = document.querySelector('#login-button');
const signupFormButton = document.querySelector('#signup-button');

// LOGIN FUNCTIONALITY
if (loginFormButton) {
	loginFormButton.addEventListener('click', (e) => {
		e.preventDefault();
		const email = document.querySelector('#login-email').value;
		const password = document.querySelector('#login-password').value;

		fetch('http://localhost:7000/api/auth/login', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 200) {
					window.localStorage.token = data.token;
					window.localStorage.role = data.user.role;
					window.localStorage.name = `${data.user.firstName} ${data.user.lastName}`;
				}
			});
	});
}

// SIGNUP FUNCTIONALITY
if (signupFormButton) {
	signupFormButton.addEventListener('click', (e) => {
		e.preventDefault();
		const firstName = document.querySelector('#first-name').value;
		const lastName = document.querySelector('#last-name').value;
		const email = document.querySelector('#signup-email').value;
		const password = document.querySelector('#signup-password').value;

		fetch('http://localhost:7000/api/auth/register', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status === 200) {
					window.localStorage.token = data.token;
					window.localStorage.role = data._savedUser.role;
					window.localStorage.user = data._savedUser._id;
					window.localStorage.name = `${data._savedUser.firstName} ${data._savedUser.lastName}`;
				}
			});
	});
}
