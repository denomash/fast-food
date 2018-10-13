
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


var myRequest = new Request('http://localhost:5000/api/v2/orders');

fetch(myRequest, myInit)
.then((resp) =>	resp.json())
.then((data) => {
	console.log(data)
	let orders = data.Orders
	let output = `
				<tr>
				    <th>Image</th>
				    <th>MealID</th>
				    <th>Order Number</th>
				    <th>Quantity</th>
				    <th>Status</th>
			        <th>Accept</th>
			        <th>Decline</th>
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
		        <td><a href="" class="btn" onclick="Accept()"><img src="../../static/img/acc.png"  height="40" width="40"></a></td>
        		<td><a href="" class="btn" onclick="Decline()"><img src="../../static/img/decline.png"  height="40" width="40"></a></td>
		    </tr>
		`;
	});
	document.getElementById('content').innerHTML = output;
})

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location = "../login.html";
}
