
let lati = 0;           //used to store latitude
let longi = 0;      //used to store longitude



//function called when the page loads, asks user for permission to share location, if user accepts then it reassigns the values for lati and longi, then runs getRestaurants(options)
window.onload = function () {
    var startPos;
    var geoSuccess = function (position) {
        startPos = position;
        lati = startPos.coords.latitude;                //gets latitude
        longi = startPos.coords.longitude;          //gets longitude
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
        getRestaurants(options)  //runs getRestaurants(options) upon success of obtaining user's locations
    };
    var geoError = function (error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError); //asks user for location permissions

};
//function used to render restaurants onto the webpage
function getRestaurants(options) {
    axios.request(options).then(function (response) {


        let restaurant = response.data.data
        let i = 0  //index used to assign specif class names to later be used for modal targets

        //loops through all restaurants 
        restaurant.forEach(rest => {
            let name = rest.restaurant_name //gets restaurant name
            let address = rest.address.formatted //gets full address 
            let phone = rest.restaurant_phone    //gets restaurant phone number
            let menu = rest.menus[0].menu_sections
            let restCard = document.createElement('li')

            //loops through all sections in the main menu
            menu.forEach(item => {



                let items = item.menu_items
                //logs array in items for easier access
                let container = document.createElement('div')
                container.append(`<h2>${item.section_name}</h2>
               <h3>Menu</h3> `)

                let unlist = document.createElement('ul')
                //gets every item in the main menu
                for (let i = 0; i < items.length; i++) {
                    unlist.append(`<li>${items[i].name}</li>`)
                    let itemName = items[i].name

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
              </div>

              </div>
      
                `
                i++//increments the index used to apply specific modal target names
                document.getElementById('slider').append(restCard) //appending modal card to webpage
            });

        })

    }).catch(function (error) {
        console.error(error);
    });

}


