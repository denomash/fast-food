
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


var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/orders');

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
		        <td id="${order.order_id}" class="btn" onclick="accept(this.id)"><img src="../../static/img/acc.png"  height="40" width="40"></td>
        		<td class="btn" onclick="decline()"><img src="../../static/img/decline.png"  height="40" width="40"></td>
		    </tr>
		`;
	});
	document.getElementById('content').innerHTML = output;
})

accept = (order_id) => {	

	let myIni = {
		method: 'PUT',
	    headers:  new Headers({
			"Access-Control-Allow-Origin": "*/*",
			"Content-Type": "application/json; charset=utf-8",
			"x-access-token": stored_token
		}),
		mode: 'cors',
		cache: 'default',
	    body: JSON.stringify({
	    	status: 'Processing'    	
	    })
	};

	let myRequest = new Request(`https://fast-food--app-v2.herokuapp.com/api/v2/orders/${order_id}`, myIni);
	
	fetch(myRequest)
	.then((resp) =>	resp.json())
	.then((data) => {
		
		Message = data.Message
		message = document.getElementById('msg');
		message.style.backgroundColor = "lightblue";
		message.style.width = "70%";
		message.style.borderRadius = "5px";
		message.style.padding = "5px";
		message.style.paddingBottom = "5px";
		message.innerHTML = Message;

		if(Message == 'Order status updated') {
			reload = () => {
				window.location.reload();
			}

			setTimeout(reload, 2000);
			
		}

	})
	.catch(err => console.log(err))
}

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location.href = "../login.html";
}

