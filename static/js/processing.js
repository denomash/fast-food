

document.getElementById('processing').addEventListener('submit', makeorder)



function makeorder(e) {
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
	    	mealId: document.getElementById('meal_id').value,
	    	quantity: document.getElementById('quantity').value,
	    	address: document.getElementById('address').value
	    	
	    })
	};

	console.log(myInit.body)

	var myRequest = new Request('http://localhost:5000/api/v2/users/orders', myInit);
	fetch(myRequest)
	.then(res => res.json())
	.then(data => {
		if(stored_token){
			location.href = "./menu.html";
			Message = data.Message
			alert(Message);

			
		} else {
			alert("Please login to place an order")
		}
	})
	.catch(err => console.log(err))
}

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location = "./login.html";
}
