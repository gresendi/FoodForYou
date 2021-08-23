//array to store recipe results
let results = JSON.parse(localStorage.getItem('results')) || []
let apiKey = ['75bd90824a3a4624855632ca25d2803b', '6b9d0e1539434e12ab8da9fd6d0a1184', '10692f6066e94188b3a428c935d5bab5']
let ingredients = 'steak,+lamb,+garlic'


let ingredientsArray = []

document.getElementById('addIngredient').addEventListener('click', () => {

    let ingredient = document.getElementById('ingredientName').value
    let ingredientElem = document.createElement('a')
    ingredientElem.className = 'button ingredient'
    ingredientElem.innerHTML = ingredient
    document.getElementById('ingredients').append(ingredientElem)
    ingredientsArray.push(ingredient)
})

axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey[2]}&ingredients=${ingredients}&number=20&limitLicense=true&ranking=1&ignorePantry=true`)
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
            axios.get(`https://api.spoonacular.com/recipes/${data[i].id}/information?apiKey=${apiKey[2]}`)
                .then(res => {
                    let recipe = res.data
                    console.log(recipe)
                    console.log(res.data.title)
                    let image = recipe.image


                    // document.body.style.cssText  = `
                    // background-image: url(${recipe.image});
                    // background-repeat: no-repeat;
                    // background-attachment: fixed;
                    // background-size: cover;
                    // background-size: 100% 100%;
                    // ` 

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