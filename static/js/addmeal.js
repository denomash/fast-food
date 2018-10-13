

document.getElementById('addmeal').addEventListener('submit', addmeal)


function addmeal(e) {
	e.preventDefault();

	// Get stored token
	var stored_token = localStorage.getItem('x-access-token');
	
	var myHeaders = new Headers({
		"Access-Control-Allow-Origin": "*/*",
		"Content-Type": "application/json; charset=utf-8",
		"x-access-token": stored_token
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

	console.log(myInit.body)

	var myRequest = new Request('http://localhost:5000/api/v2/menu', myInit);
	fetch(myRequest)
	.then(res => res.json())
	.then(data => {
		if(stored_token){
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
