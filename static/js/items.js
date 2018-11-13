
// document.getElementById('edit').style.display = "none";

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


var myRequest = new Request('https://fast-food--app-v2.herokuapp.com/api/v2/menu');
fetch(myRequest,myInit)
.then((resp) =>	{

	if (resp.status == '404'){

		resp.json().then(function(data) {

	        let meals = data.Meals
	        message = document.getElementById('msg');
			dv = document.getElementById('logmsg');
			dv.style.width = "100%";
			dv.style.height = "150px";
			dv.style.color = "red";
			dv.style.borderRadius = "5px";
			dv.style.boxShadow = "2px 2px 2px 2px #888888";
			dv.style.paddingTop = "70px";
			dv.innerHTML = meals;

		});

	} else if (resp.status == '401'){

		logout()

	} else if (resp.status == '200'){

		resp.json().then((data) => {

			let meals = data.Meals

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
				        <td class="btn" id="${meal.meal_id}" onclick="editMeal(this.id)"><img src="../../static/img/edit.png"  height="45" width="45"></td>
				        <td class="btn" id="${meal.meal_id}" onclick="deleteMeal(this.id)"><img src="../../static/img/delete-512.png"  height="45" width="45"></td>
		        	</tr>
				`;
			});

			document.getElementById('content').innerHTML = output;
		})
	}
})


editMeal = (mealId) => {
	var myHeader = new Headers({
		"Access-Control-Allow-Origin": "*/*",
		"Content-Type": "application/json; charset=utf-8",
		"x-access-token": storedToken
	});

	var myIn = { method: 'GET',
	               headers: myHeader,
	               mode: 'cors',
	               cache: 'default' };


	var myRequest = new Request(`https://fast-food--app-v2.herokuapp.com/api/v2/menu/${mealId}`, myIn);

	fetch(myRequest)
	.then((resp) =>	{
		if (resp.status == '404'){

			resp.json().then(function(data) {

		        let meals = data.Meals
		        message = document.getElementById('msg');
				dv = document.getElementById('logmsg');
				dv.style.width = "100%";
				dv.style.height = "150px";
				dv.style.color = "red";
				dv.style.borderRadius = "5px";
				dv.style.boxShadow = "2px 2px 2px 2px #888888";
				dv.style.paddingTop = "70px";
				dv.innerHTML = meals;

			});

			} else if (resp.status == '401'){

				logout()

			} else if (resp.status == '200'){

				resp.json().then((data) => {

					let meals = data.Meals

					let output = ''
					
					meals.forEach((meal) => {
						output += `
							<form id="addmeal">
							<div id="close" onclick="hide()">+</div>
					        <h1>Edit meal</h1>
					        <label><b>Image</b></label>
					        <input type="text" value="${meal.image}" id="image" required>

					        <label><b>Meal name</b></label>
					        <input type="text" value="${meal.food}" id="meal" required>

					        <label><b>Price</b></label>
					        <input type="text" value="${meal.price}" id="price" required>

					        <label><b>Description</b></label>
					        <input type="text" value="${meal.description}" id="description" required>

					        <div>
					         <button id="${meal.meal_id}" onclick="edit(this.id)">Edit <i class="plus"></i></button>
					        </div>
					                        
					      </form>
						`;
					});
					editml = document.getElementById('overlayer');
					content = document.getElementById('edit');
					editml.style.display = "flex";
					content.innerHTML = output;
					
				})
			}
	})	

}

hide = () =>{
	document.getElementById('overlayer').style.display = "None";
}

edit = (mealId) => {	

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
	    	image: document.getElementById('image').value,
	    	item: document.getElementById('meal').value,
	    	price: document.getElementById('price').value,
	    	description: document.getElementById('description').value    	
	    })
	};

	let myRequest = new Request(`https://fast-food--app-v2.herokuapp.com/api/v2/menu/${mealId}`, myIni);
	fetch(myRequest)
	.then((resp) =>	{
		if (resp.status == '204'){

			reload = () => {
				window.location.reload();
			}

			setTimeout(reload, 1000);

		} else if (resp.status == '401'){

			logout()

		} else if (resp.status == '400') {

			return Promise.resolve(resp.json())

		}
	})
	.then((data) => {
		Message = data.Message
		message = document.getElementById('msg');
		message.style.backgroundColor = "lightblue";
		message.style.width = "70%";
		message.style.borderRadius = "5px";
		message.style.padding = "5px";
		message.style.paddingBottom = "5px";
		message.innerHTML = Message;

	})
	.catch(err => console.log(err))
}

deleteMeal = (mealId) => {	

	let myIni = {
		method: 'DELETE',
	    headers:  new Headers({
			"Access-Control-Allow-Origin": "*/*",
			"Content-Type": "application/json; charset=utf-8",
			"x-access-token": storedToken
		}),
		mode: 'cors',
		cache: 'default'
	};

	let myRequest = new Request(`https://fast-food--app-v2.herokuapp.com/api/v2/menu/${mealId}`, myIni);
	fetch(myRequest)
	.then((resp) =>	{

		if (resp.status == '204'){

			reload = () => {
				window.location.reload();
			}

			setTimeout(reload, 1000);

		} else if (resp.status == '401'){

			logout()

		} else if (resp.status == '400') {

			return Promise.resolve(resp.json())
			
		}
	})
	.then((data) => {
		Message = data.Message
		message = document.getElementById('msg');
		message.style.backgroundColor = "lightblue";
		message.style.width = "70%";
		message.style.borderRadius = "5px";
		message.style.padding = "5px";
		message.style.paddingBottom = "5px";
		message.innerHTML = Message;		

	})
	.catch(err => console.log(err))
}

function logout() {
	// Remove data
	localStorage.removeItem('x-access-token');
	localStorage.removeItem('role');

	window.location.href = "../login.html";
}
