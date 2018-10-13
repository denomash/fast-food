
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
