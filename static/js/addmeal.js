

// Get stored token
var role = localStorage.getItem('role');

if(role !== 'admin' || role == 'null') {
	window.location = "../../index.html";
}

document.getElementById('addmeal').addEventListener('submit', addmeal)


function addmeal(e) {
	e.preventDefault();

	// Get stored token
	var storedToken = localStorage.getItem('x-access-token');
	
	var myHeaders = new Headers({
		"Access-Control-Allow-Origin": "*/*",
		"Content-Type": "application/json; charset=utf-8",
		"x-access-token": storedToken
	});

	var myInit = {
		method: 'post',
	    headers: myHeaders,
		mode: 'cors',
		cache: 'default',
	    body: JSON.stringify({
	    	image: document.getElementById('image').value,
	    	item: document.getElementById('meal').value,
	    	price: document.getElementById('price').value,
	    	description: document.getElementById('description').value    	
	    })
	};

	var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/menu', myInit);
	fetch(myRequest)
	.then(res => res.json())
	.then(data => {

		let Message = data.Message

		if (Message == 'Invalid token!'){
			logout()
		}

		if(storedToken){
			Message = data.Message
			alert(Message);		
		}
	})
	.catch(err => console.log(err))
}

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location = "../login.html";
}
