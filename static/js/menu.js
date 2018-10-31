

var myHeaders = new Headers({
    'Content-Type': 'application/json'
});
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

function order() {
    location.href = "UI/processing.html";
}
// Get stored token
var storedToken = localStorage.getItem('x-access-token');
var storedRole = localStorage.getItem('role');

if (storedToken && storedRole == 'admin') {
	document.getElementById('clnt').style.display = "none";
	document.getElementById('not').style.display = "none";

} else if(storedToken && storedRole == 'client') {
	document.getElementById('adm').style.display = "none";
	document.getElementById('not').style.display = "none";
} else {
	document.getElementById('clnt').style.display = "none";
	document.getElementById('adm').style.display = "none";	
}



var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/menu');
fetch(myRequest,myInit)
.then((resp) =>	resp.json())
.then((data) => {
	let meals = data.Meals
	let output = ''
	
	meals.forEach((meal) => {
		output += `
			<div class="card">
				<img src="${meal.image}">
				<h3>${meal.food}</h3>
				<small>MealID: ${meal.meal_id}</small>
				<p>Ksh ${meal.price}</p>
				<button onclick="order()">Order</button>
			</div>
			`;
	});
	document.getElementById('menu').innerHTML = output;
})

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location = "UI/login.html";
}

