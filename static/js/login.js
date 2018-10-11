

const loginForm = document.getElementById('log');




var myRequest = new Request('http://localhost:5000/api/v2/auth/login');


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
		token = data.token;
		console.log(token);
		localStorage.setItem('x-access-token', token);
		setAuthorizationHeader(token);
		alert('Logged in successfull')		
		window.location.href = "menu.html";
	})
}

if(typeof loginForm !== 'undefined' && loginForm !== null) {
    loginForm.addEventListener('submit', login);
  }
else{
	console.log("Error")
}
