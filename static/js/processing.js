
document.getElementById('alert').style.display = "none";

document.getElementById('processing').addEventListener('submit', makeorder)

// Get stored token
var stored_token = localStorage.getItem('x-access-token');

if (stored_token == 'null') {
	document.getElementById('not').style.display = "none";

} else if(stored_token !== 'null') {
	document.getElementById('lg').style.display = "none";
}

function makeorder(e) {
	e.preventDefault();
		
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
	    	mealId: document.getElementById('meal_id').value,
	    	quantity: document.getElementById('quantity').value,
	    	address: document.getElementById('address').value
	    	
	    })
	};



	var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/users/orders', myInit);
	fetch(myRequest)
	.then(res => res.json())
	.then(data => {
		if(stored_token){
			Message = data.Message;
			message = document.getElementById('msg');
			message.style.backgroundColor = "lightblue";
			message.style.width = "70%";
			message.style.borderRadius = "5px";
			message.style.padding = "5px";
			message.innerHTML = Message;

			
		} else {
			document.getElementById('alert').style.display = "block";		}
	})
	.catch(err => console.log(err))
}

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location = "./login.html";
}
