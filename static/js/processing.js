
document.getElementById('alert').style.display = "none";

document.getElementById('processing').addEventListener('submit', makeorder)

// Get stored token
var storedToken = localStorage.getItem('x-access-token');
var storedRole = localStorage.getItem('role');

if (storedToken !== 'null' && storedRole !== 'null') {
	document.getElementById('lg').style.display = "none";

} else if(storedToken == 'null' && storedRole == 'null') {
	document.getElementById('not').style.display = "none";
}

function makeorder(e) {
	e.preventDefault();
		
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
	    	mealId: document.getElementById('mealId').value,
	    	quantity: document.getElementById('quantity').value,
	    	address: document.getElementById('address').value
	    	
	    })
	};



	var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/users/orders', myInit);
	fetch(myRequest)
	.then(res => {

		if (storedToken !== 'null' && storedRole !== 'null') {
			document.getElementById('alert').style.display = "block";

			redirect = () => {
				location.replace("./login.html");
			}

			setTimeout(redirect, 2000);

		} else if (res.status == '401'){

			logout()

		} else if (res.status == '400') {

			res.json().then((data) =>{
				Message = data.Message;
				message = document.getElementById('msg');
				message.style.backgroundColor = "lightblue";
				message.style.width = "70%";
				message.style.borderRadius = "5px";
				message.style.padding = "5px";
				message.innerHTML = Message;
				
			})
			
		} else if (res.status == '201'){
			res.json().then((data) =>{
				Message = data.Message;
				message = document.getElementById('msg');
				message.style.backgroundColor = "lightblue";
				message.style.width = "70%";
				message.style.borderRadius = "5px";
				message.style.padding = "5px";
				message.innerHTML = Message;

				redirect = () => {
					location.replace("../index.html");
				}

				setTimeout(redirect, 2000);
			})


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
