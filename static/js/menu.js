

var myHeaders = new Headers({
    'Content-Type': 'application/json'
});
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',

               cache: 'default' };

function order() {
    // document.getElementById("form").style.display = "block";
    location.href = "./processing.html";
}

var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/menu');
fetch(myRequest,myInit)
.then((resp) =>	resp.json())
.then((data) => {
	let meals = data.Meals
	console.log(meals)
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

