//array of api keys for use of spoonacular api
let apiKey = ['75bd90824a3a4624855632ca25d2803b', '6b9d0e1539434e12ab8da9fd6d0a1184', '10692f6066e94188b3a428c935d5bab5', '654230d7c6694093a69b1921f33789a0', '7a0d026544114effb86382cfa588cd7a', 'e5a2cf5f3401441aba72a1c383214705', '81ce8ed43c26458abb7e9c40cd19eda8', '41a14134f83a4f7386c1344e5a69ddcd', '8749340965d3428586c18ba074e0c4de', '68c5a0da0f5f493ca287426de7a1b0dc', 'c5aa3e9b829b464fbcfa7de12c1af17f']
//array which is either getting ingredients from local storage or creating a new array
let ingredientsArray = JSON.parse(localStorage.getItem('ingredients')) || []
let localArray = JSON.parse(localStorage.getItem('savedRecipe')) || [] //array to store savedRecipes, retrieving any already stored in localStorage
let allRecipes = []
let apiIndex = 6 //index for the apiKeys, changed if current pull requests are not working, 0-10 
let numRecipes = 10



//function to render ingredients as buttons
function renderIngredients(array) {

    array.forEach(element => {
        let li = document.createElement('li')
        let ingredientElem = document.createElement('a')
        ingredientElem.className = 'button ingredient'
        ingredientElem.innerHTML = element

        li.append(ingredientElem)
        document.getElementById('ingredients').append(li)

    });

}

renderIngredients(ingredientsArray) //rendering ingredients inputed by user in home screen
renderSlides(ingredientsArray, apiIndex) //rednering recipes on page

//event listener for removing ingredients
document.addEventListener('click', event => {

    if (event.target.classList.contains('ingredient')) {
        event.target.remove()
        let name = event.target.innerHTML

        for (let i = 0; i < ingredientsArray.length; i++) {
            if (ingredientsArray[i] === name) {
                ingredientsArray.splice(i, 1)
                localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));
            }
        }
        renderSlides(ingredientsArray, apiIndex)


    }
})
//function for the removal of all child elements within an element
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



//Function to render the recipes
function renderSlides(ingredients, index) {

    let slider = document.getElementById('slider')
    removeAllChildNodes(slider)                                            //removing any pre-existing recipes loaded before                   
    let ingredientsFormatted = ''
    for (let i = 0; i < ingredients.length; i++) {                      //looping through ingredients in order to format the ingredients to be used in the api request
        if (i == 0) {
            ingredientsFormatted = ingredients[i]
        }
        else {
            ingredientsFormatted += (', ' + ingredients[i])
        }
    }





    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey[index]}&ingredients=${ingredientsFormatted}&number=${numRecipes}&limitLicense=true&ranking=1&ignorePantry=true`) //requesting recipes based off of ingredients given
        .then(res => {

            //setting data = an array within res
            let data = res.data

            //creating a card
            let card = document.createElement('div')

            //looping through 5 reesults, creating cards for each and then getting more information from spoonacular based of of the recipes id, previouse search reults do not hold all of the infromation required.
            let saved = 0
            for (i = 0; i < data.length; i++) {
                const card = document.createElement('div')


                //getting dataset from spoonacular based off of a specific id
                axios.get(`https://api.spoonacular.com/recipes/${data[i].id}/information?apiKey=${apiKey[index]}`)
                    .then(res => {
                        let recipe = res.data
                        allRecipes.push(recipe)
                        let image = recipe.image
                        let listItem = document.createElement('li')
                        listItem.innerHTML = `

                
                        <div class="uk-card uk-card-primary">
                             <div class="uk-card-media-top">
                                 <img src ="${recipe.image}" alt ="${recipe.title}">
                             </div>
                         <div class="uk-card-body">
                                <h1>${recipe.title}</h1>
                                <p>${recipe.summary}</p>       
                                 <button id ="${recipe.id}" uk-toggle="target: #${'modal' + recipe.id}" type="button" class ="getrecipe">View Recipe</button></div>
                         </div>

                         <div id="${'modal' + recipe.id}" uk-modal>
                             <div class="uk-modal-dialog uk-modal-body">
                                 <h2 class="uk-modal-title">${recipe.title}</h2>
                                  <img src ="${recipe.image}" alt ="${recipe.title}">
                          <div>${recipe.instructions}</div>
                                  <button class="uk-modal-close uk-button-default uk-button-large" type="button">Close</button>
                                 <button class="uk-button uk-button-primary uk-button-large save${saved++}" type="button">Save</button>            
                            </div>
                          </div>
      
                                          `
                        document.getElementById('slider').append(listItem)
                    })
            }
        })
}

//click event listener for saving recipes
document.addEventListener('click', event => {

    for (i = 0; i < allRecipes.length; i++) {
        if (event.target.classList.contains(`save${i}`)) {
            if (event.target.innerHTML === 'Save') {                            //looking for button that was clicked with "Save" as a class
                event.target.innerHTML = 'Saved'                                     //changing the inner html for the button to saved after its clicked

                let recipeObject = {}                                                         //creating object to be saved into local storage
                recipeObject["name"] = allRecipes[i].title
                recipeObject["image"] = allRecipes[i].image
                recipeObject["id"] = allRecipes[i].id
                recipeObject["summary"] = allRecipes[i].summary
                recipeObject["instructions"] = allRecipes[i].instructions
                let alreadySaved = false
                localArray.forEach(element => {                                     //Checking to see if recipe has already been saved,
                    if (element.name === recipeObject.name) {
                        alreadySaved = true
                    }
                })

                if (alreadySaved === false) {
                    localArray.push(recipeObject);                                     //if recipe hasnt been saved  then adding the recipe object to localArray
                    localStorage.setItem('savedRecipe', JSON.stringify((localArray)))               //Overwriting 'savedRecipe' with localArray, after the recipe save button is clicked 
                }
            }

        }
    }

})