//array to store recipe results
let results = JSON.parse(localStorage.getItem('results')) || []
let ingredientsArray = JSON.parse(localStorage.getItem('ingredients')) || []

let apiKey = ['75bd90824a3a4624855632ca25d2803b', '6b9d0e1539434e12ab8da9fd6d0a1184', '10692f6066e94188b3a428c935d5bab5', '654230d7c6694093a69b1921f33789a0', '7a0d026544114effb86382cfa588cd7a', 'e5a2cf5f3401441aba72a1c383214705', '81ce8ed43c26458abb7e9c40cd19eda8', '41a14134f83a4f7386c1344e5a69ddcd', '8749340965d3428586c18ba074e0c4de', '68c5a0da0f5f493ca287426de7a1b0dc','c5aa3e9b829b464fbcfa7de12c1af17f']
// let ingredients = 'steak,+lamb,+garlic'

//array of ingredients


function renderIngredients(array){

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

//click event for adding ingredients
document.getElementById('addIngredient').addEventListener('click', event => {

   event.preventDefault()
    let ingredient = document.getElementById('ingredientName').value

    let li = document.createElement('li')
    let ingredientElem = document.createElement('a')
    ingredientElem.className = 'button ingredient'
    ingredientElem.innerHTML = ingredient
    li.append(ingredientElem)
    document.getElementById('ingredients').append(li)
    ingredientsArray.push(ingredient)
    localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));


    renderSlides(ingredientsArray)



})

//click event for deleting ingredients
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
        renderSlides(ingredientsArray)
        console.log(ingredientsArray)
       
        
    }
})
//function used to remove all of the recipes from the ul
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//function used to render all of the recipes
function renderSlides(ingredients){

let slider= document.getElementById('slider')    
removeAllChildNodes(slider)
let ingredientsFormatted = ''
for( let i =0; i < ingredients.length;i++)
{
    if(i==0){
        ingredientsFormatted=ingredients[i]
    }
  else{
        ingredientsFormatted += (', ' + ingredients[i])
    }
}
console.log(`ingredients: ${ingredientsFormatted}`)


axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey[0]}&ingredients=${ingredientsFormatted}&number=3&limitLicense=true&ranking=1&ignorePantry=true`)
    .then(res => {

        //setting data = an array within res
        let data = res.data

        //creating a card
        let card = document.createElement('div')
        // console.log(data)
        //looping through 5 reesults, creating cards for each and then getting more information from spoonacular based of of the recipes id, previouse search reults do not hold all of the infromation required.
        for (i = 0; i < data.length; i++) {
            const card = document.createElement('div')

            // console.log(data[i])
            //getting dataset from spoonacular based off of a specific id
            axios.get(`https://api.spoonacular.com/recipes/${data[i].id}/information?apiKey=${apiKey[0]}`)
                .then(res => {
                    let recipe = res.data
                    console.log(recipe)
                    // console.log(res.data.title)
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
             <button class="uk-button uk-button-primary uk-button-large" type="button">Save</button>
              </div>

              </div>
      
                `
                console.log(recipe.instructions)

                    document.getElementById('slider').append(listItem)

                


                    //creating the innerHTML for the card, getting title, summary and instructions, creating both a card and a module for when the button 'View Recipe' is clicked
                    //     card.innerHTML = `

                    // <div class="uk-card uk-card-default">
                    // <div class="uk-card-media-right">
                    //  <img src ="${recipe.image}" alt ="${data[i].title}">
                    //   </div>
                    // <div class="uk-card-body">
                    //     <h1>${data[i].title}</h1>
                    //     <p>${recipe.summary}</p>

                    // <button id ="${data[i].id}" uk-toggle="target: #${'modal' + data[i].id}" type="button" class ="getrecipe">View Recipe</button></div>
                    // </div>

                    //       <div id="${'modal' + data[i].id}" uk-modal>
                    // <div class="uk-modal-dialog uk-modal-body">
                    //  <h2 class="uk-modal-title">${recipe.title}</h2>
                    //   <img src ="${recipe.image}" alt ="${data[i].title}">
                    //   <div>${recipe.instructions}</div>
                    //   <button class="uk-modal-close uk-button-default uk-button-large" type="button">Close</button>
                    //  <button class="uk-button uk-button-primary uk-button-large" type="button">Save</button>
                    //   </div>

                    //   </div>
                    //       `


                    //     results.push(data[i].id)
                    //     document.getElementById('recipes').append(card)



                })
                .catch(err => console.error(err))


            // console.log(ids[i])
        }

        localStorage.setItem('results', JSON.stringify(results))

    })

}