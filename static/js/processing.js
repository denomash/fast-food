
function makeorder() {

	// Get stored token
	var stored_token = localStorage.getItem('x-access-token');

	var myHeaders = new Headers({
	'Content-Type': 'application/json'
	});
	var myInit = {
		method: 'POST',
	    headers: myHeaders,
	    body: JSON.stringify({
	    	meal_id: document.getElementById('meal_id').value,
	    	quantity: document.getElementById('quantity').value,
	    	address: document.getElementById('address').value
	    	
	    })
	};
	var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/users/orders');
	fetch(myRequest, myInit)
	.then((res) => res.json())
	.then((data) => {		

		if(stored_token){
			console.log(stored_token)
			// location.href = "./menu.html";
			alert('Order made successfully');

			
		} else {
			alert("Please login to place an order")
		}
	})
}
