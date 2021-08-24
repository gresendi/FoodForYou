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

let lati =0;
let longi =0;

function getCords () {
    var startPos;
    var geoSuccess = function (position) {
        startPos = position;
        lati = startPos.coords.latitude;
        longi = startPos.coords.longitude;
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
};
  window.onload = getCords()






  const options = {
    method: 'GET',
      url: `https://api.documenu.com/v2/restaurants/search/geo`, //gets restaurant by location
    params: {
      //gets specific restaurants by cuisine
      lat:lati,
      lon: longi,
      distance: 100,
      minutes: 40,
      mode: 'driving',
      size:40,
      fullmenu: true
    },
    headers: {
      'x-api-key': 'c5635d237ebd984eddc8c697a7984b37',
      'x-rapidapi-host': 'documenu.p.rapidapi.com',
      'x-rapidapi-key': 'db65e1ffd1msh01cf6a541daf477p1eb122jsn2e2d1c14b7cc'
    }
  };

  axios.request(options).then(function (response) {
      console.log(response)
    console.log(response.data);
    let restaurant = response.data.data 
    console.log(restaurant)

    //loops through all restaurants 
    restaurant.forEach(rest => {
        let name = rest.restaurant_name //gets restaurant name
      let address = rest.address.formatted //gets full address 
      let phone = rest.restaurant_phone    //gets restaurant phone number
      let menu = rest.menus[0].menu_sections
      let menuContainer = document.createElement('ul')
    //   console.log(name)
    //   console.log(address)
    //   console.log(phone)
    //   console.log(menu)

      //loops through all sections in the main menu
      menu.forEach(item => {
        menuContainer.append(`<h3>${item.section_name}</h3>`)
        // console.log(item.section_name)

        let liItemElem = document.createElement('li')
        let items = item.menu_items
        //logs array in items for easier access
        // console.log(items)


        //gets every item in the main menu
        for(let i = 0;i<items.length;i++)
        { 
            liItemElem.innerHTML=''
            liItemElem.innerHTML=` ${items[i].name}`
            menuContainer.append(liItemElem)
        //   console.log(items[i].name) //logs the name of the item.
          //future implementation to add list items to display restaurants menu
        }

    });
    console.log(menuContainer)



    })



  }).catch(function (error) {
    console.error(error);
  });


    getCords()
axios.get(`http://api.geonames.org/addressJSON?lat=44&lng=-88&username=gresendi95`)
        .then(res => {

            console.log(res)
            console.log(lati, longi)

        })
        .catch(err => console.error(err))
    

