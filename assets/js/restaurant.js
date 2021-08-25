let ingredientsArray = JSON.parse(localStorage.getItem('ingredients')) || []

//array of ingredients user inputed


//function to render ingredients as buttons
function renderIngredients(array) {

    array.forEach(element => {
        let li = document.createElement('li')
        let ingredientElem = document.createElement('a')
        ingredientElem.className = 'button ingredient'
        ingredientElem.innerHTML = element
        console.log(element)
        li.append(ingredientElem)
        document.getElementById('ingredients').append(li)

    });

}
renderIngredients(ingredientsArray)


document.addEventListener('click', event => {

    if (event.target.classList.contains('ingredient')) {
        event.target.remove()
        let name = event.target.innerHTML
        console.log(name)
        console.log(ingredientsArray)
        for (let i = 0; i < ingredientsArray.length; i++) {
            if (ingredientsArray[i] === name) {
                ingredientsArray.splice(i, 1)
                localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));
            }
        }
        // renderSlides(ingredientsArray)

        console.log(ingredientsArray)
    }
})



// documenu api, works, searches by zipcode, can filter by cuisine  

let lati = 0;
let longi = 0;




window.onload = function () {
    var startPos;
    var geoSuccess = function (position) {
        startPos = position;
        lati = startPos.coords.latitude;
        longi = startPos.coords.longitude;
        const options = {

            method: 'GET',
            url: `https://api.documenu.com/v2/restaurants/search/geo`, //gets restaurant by location
            params: {
                //gets specific restaurants by cuisine
                lat: lati,
                lon: longi,
                distance: 100,
                minutes: 40,
                mode: 'driving',
                size: 40,
                fullmenu: true
            },
            headers: {
                'x-api-key': 'c5635d237ebd984eddc8c697a7984b37',
                'x-rapidapi-host': 'documenu.p.rapidapi.com',
                'x-rapidapi-key': 'db65e1ffd1msh01cf6a541daf477p1eb122jsn2e2d1c14b7cc'
            }
        };
        getRecipes(options)
    };
    var geoError = function (error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
   
};

function getRecipes (options) {
    axios.request(options).then(function (response) {

        console.log(response)
        console.log(response.data);
        let restaurant = response.data.data
        console.log(restaurant)
        let i =0

        //loops through all restaurants 
        restaurant.forEach(rest => {
            let name = rest.restaurant_name //gets restaurant name
            let address = rest.address.formatted //gets full address 
            let phone = rest.restaurant_phone    //gets restaurant phone number
            let menu = rest.menus[0].menu_sections
            let restCard = document.createElement('li')

            //loops through all sections in the main menu
            menu.forEach(item => {
               
                // console.log(item.section_name)

                
                let items = item.menu_items
                //logs array in items for easier access
                // console.log(items)
                let container = document.createElement('div')
                container.append(`<h2>${item.section_name}</h2>
               <h3>Menu</h3> `)
                
                let unlist = document.createElement('ul')
                //gets every item in the main menu
                for (let i = 0; i < items.length; i++) {
                    unlist.append(`<li>${items[i].name}</li>`)
                    let itemName = items[i].name
                    console.log(itemName)
                    //   console.log(items[i].name) //logs the name of the item.
                    //future implementation to add list items to display restaurants menu
                }
                container.append(unlist)

            restCard.innerHTML = `

                
  <div class="uk-card uk-card-primary">
          
            <div class="uk-card-body">
                <h1>${name}</h1>
                <h2>${address}</h2>
                <h2>${phone}</h2>
            
            <button id ="${phone}" uk-toggle="target: #${'modal' + i}" type="button" class ="getrecipe">View Menu</button></div>
            </div>

                  <div id="${'modal' + i}" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
             <h2 class="uk-modal-title">${name}</h2>
             
              <div>${unlist.innerText}</div>
              <button class="uk-modal-close uk-button-default uk-button-large" type="button">Close</button>
             <button class="uk-button uk-button-primary uk-button-large" type="button">Save</button>
              </div>

              </div>
      
                `
            i++




            document.getElementById('slider').append(restCard)
                

            });
           

            



        })



    }).catch(function (error) {
        console.error(error);
    });

}


