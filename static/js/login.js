

const loginForm = document.getElementById('log');




var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/auth/login');


function login(e) {
	e.preventDefault();

	var myHeaders = new Headers({
	'Content-Type': 'application/json'
	});
	var myInit = {
		method: 'POST',
	    headers: myHeaders,
	    body: JSON.stringify({
	    	password: document.getElementById('password').value,
	    	email: document.getElementById('email').value
	    	
	    })
	};
	fetch(myRequest, myInit)
	.then((res) => res.json())
	.then((data) => {

		if(data.Message.token && data.Message.role == 'admin'){
			window.location = "./admin/orders.html";
			token = data.Message.token;
			localStorage.setItem('x-access-token', token);
			localStorage.setItem('role', data.Message.role);
			setAuthorizationHeader(token);

			alert('Logged in successfull');

			
		} else if (data.Message.token && data.Message.role == 'client'){
			window.location = "../index.html";
			token = data.Message.token;
			localStorage.setItem('x-access-token', token);
			localStorage.setItem('role', data.Message.role);
			setAuthorizationHeader(token);

			alert('Logged in successfull')
		} else {
			console.log(data)
			message = data.Message;
			alert(message)
		}
	})
}

if(typeof loginForm !== 'undefined' && loginForm !== null) {
    loginForm.addEventListener('submit', login);
  }
else{
	console.log("Error")
}
