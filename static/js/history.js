
// Get stored token
var stored_token = localStorage.getItem('x-access-token');

var myHeaders = new Headers({
	"Access-Control-Allow-Origin": "*/*",
	"Content-Type": "application/json; charset=utf-8",
	"x-access-token": stored_token
});

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };


var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/users/orders');

fetch(myRequest, myInit)
.then((resp) =>	resp.json())
.then((data) => {
	let orders = data.Orders
	let Message = data.Message

	if (orders == 'No order history'){
		message = document.getElementById('msg');
		dv = document.getElementById('logmsg');
		dv.style.width = "100%";
		dv.style.height = "150px";
		dv.style.color = "red";
		dv.style.borderRadius = "5px";
		dv.style.boxShadow = "2px 2px 2px 2px #888888";
		dv.style.paddingTop = "70px";
		dv.innerHTML = orders;
	} else if (Message == 'Invalid token!'){
		logout()
	}
	let output = `
				<tr>
				    <th>Image</th>
				    <th>MealID</th>
				    <th>Order Number</th>
				    <th>Quantity</th>
				    <th>Status</th>
			    </tr> 
				`
	
	orders.forEach((order) => {
		output += `
			<tr>
		        <td><img src="${order.image}" height="60" width="100"></td>
		        <td>${order.meal_id}</td>
		        <td>${order.order_id}</td>
		        <td>${order.quantity}</td>
		        <td>${order.status}</td>
		    </tr>
		`;
	});
	document.getElementById('content').innerHTML = output;
})

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location = "./login.html";
}
