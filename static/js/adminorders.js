
// Get stored token
var storedToken = localStorage.getItem('x-access-token');
var role = localStorage.getItem('role');

if(role !== 'admin' || role == 'null') {
	window.location = "../../index.html";
}

var myHeaders = new Headers({
	"Access-Control-Allow-Origin": "*/*",
	"Content-Type": "application/json; charset=utf-8",
	"x-access-token": storedToken
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
	let Message = data.Message

	if (orders == 'No orders found'){
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
        		<td id="${order.order_id}" class="btn" onclick="decline(this.id)"><img src="../../static/img/decline.png"  height="40" width="40"></td>
		    </tr>
		`;
	});
	document.getElementById('content').innerHTML = output;

})

accept = (orderId) => {	

	let myIni = {
		method: 'PUT',
	    headers:  new Headers({
			"Access-Control-Allow-Origin": "*/*",
			"Content-Type": "application/json; charset=utf-8",
			"x-access-token": storedToken
		}),
		mode: 'cors',
		cache: 'default',
	    body: JSON.stringify({
	    	status: 'Processing'    	
	    })
	};

	let myRequest = new Request(`https://fast-food--app-v2.herokuapp.com/api/v2/orders/${orderId}`, myIni);
	
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

decline = (orderId) => {

	let myIni = {
		method: 'PUT',
	    headers:  new Headers({
			"Access-Control-Allow-Origin": "*/*",
			"Content-Type": "application/json; charset=utf-8",
			"x-access-token": storedToken
		}),
		mode: 'cors',
		cache: 'default',
	    body: JSON.stringify({
	    	status: 'Cancelled'    	
	    })
	};

	let myRequest = new Request(`https://fast-food--app-v2.herokuapp.com/api/v2/orders/${orderId}`, myIni);
	
	fetch(myRequest)
	.then((resp) =>	resp.json())
	.then((data) => {
		Message = data.Message
		message = document.getElementById('msg');
		message.style.backgroundColor = "lightblue";
		message.style.width = "70%";
		message.style.borderRadius = "5px";
		message.style.padding = "5px";
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

