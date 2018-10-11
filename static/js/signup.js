

document.getElementById('food').addEventListener('submit', register);

function register(e) {
	e.preventDefault();

	var myHeaders = new Headers({
	'Content-Type': 'application/json'
	});
	var myInit = {
		method: 'POST',
	    headers: myHeaders,
	    body: JSON.stringify({
	    	"username": document.getElementById('username').value,
	    	"email": document.getElementById('email').value, 
	    	"password": document.getElementById('password').value, 
	    	"confirm_password": document.getElementById('confirm_password').value
	    })
	};

	var myRequest = new Request('http://localhost:5000/api/v2/auth/signup');

	fetch(myRequest, myInit)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		alert('Register successfull')
	})
}
