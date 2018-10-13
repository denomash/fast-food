
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


var myRequest = new Request('http://localhost:5000/api/v2/menu');
fetch(myRequest,myInit)
.then((resp) =>	resp.json())
.then((data) => {
	let meals = data.Meals
	console.log(meals)
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
