

const reg = document.getElementById('regForm')

reg.addEventListener('submit', (e) => {
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
	    	"confirm_password": document.getElementById('confirmPassword').value
	    })
	};

	var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/auth/signup');

	fetch(myRequest, myInit)
	.then((res) => {

		if (res.status == '400'){

			return Promise.resolve(res.json())

		} else if (res.status == '201') {

			redirect = () => {
				window.location.href = "./login.html";
			}

			setTimeout(redirect, 1000);
		}
	})
	.then((data) => {
		
		Message = data.Message;

		message = document.getElementById('msg');
		message.style.backgroundColor = "lightblue";
		message.style.width = "70%";
		message.style.borderRadius = "5px";
		message.style.padding = "5px";
		message.innerHTML = Message;
	})
})
