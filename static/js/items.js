
	// Get stored token
var stored_token = localStorage.getItem('x-access-token');
var role = localStorage.getItem('role');

if(role !== 'admin' || role == 'null') {
	console.log('Seen')
	window.location = "../../index.html";
}

var myHeaders = new Headers({
		"Access-Control-Allow-Origin": "*/*",
		"Content-Type": "application/json; charset=utf-8",
		"x-access-token": stored_token
	});

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };


var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/menu');
fetch(myRequest,myInit)
.then((resp) =>	resp.json())
.then((data) => {
	let meals = data.Meals
	let Message = data.Message

	if (meals == 'No meals found'){
		message = document.getElementById('msg');
		dv = document.getElementById('logmsg');
		dv.style.width = "100%";
		dv.style.height = "150px";
		dv.style.color = "red";
		dv.style.borderRadius = "5px";
		dv.style.boxShadow = "2px 2px 2px 2px #888888";
		dv.style.paddingTop = "70px";
		dv.innerHTML = meals;
	} else if (Message == 'Invalid token!'){
		logout()
	}

	let output = `
				<tr>
				    <th>Image</th>
				    <th>Item</th>
				    <th>Price(Ksh)</th>
				    <th>Edit</th>
				    <th>Delete</th>
			    </tr> 
				`
	
	meals.forEach((meal) => {
		output += `
			<tr>
		        <td><img src="${meal.image}" height="60" width="100"></td>
		        <td>${meal.food}</td>
		        <td>${meal.price}</td>
		        <td><a href="" class="btn" onclick="Edit()"><img src="../../static/img/edit.png"  height="50" width="50"></a></td>
        		<td><a href="" class="btn" onclick="Delete()"><img src="../../static/img/delete-512.png"  height="50" width="50"></a>
		    </tr>
		`;
	});
	document.getElementById('content').innerHTML = output;
})
