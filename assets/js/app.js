//array to store  ingredients entered by user
let ingredientsArray = JSON.parse(localStorage.getItem('ingredients')) || []

//multiple keys in case one doesnt work
let apiKey = ['75bd90824a3a4624855632ca25d2803b', '6b9d0e1539434e12ab8da9fd6d0a1184', '10692f6066e94188b3a428c935d5bab5', '654230d7c6694093a69b1921f33789a0', '7a0d026544114effb86382cfa588cd7a', 'e5a2cf5f3401441aba72a1c383214705', '81ce8ed43c26458abb7e9c40cd19eda8', '41a14134f83a4f7386c1344e5a69ddcd', '8749340965d3428586c18ba074e0c4de', '68c5a0da0f5f493ca287426de7a1b0dc', 'c5aa3e9b829b464fbcfa7de12c1af17f']

//function to render ingredients as buttins in the nav bar
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

//calling renderIngredients from localStorage array  once page loads
renderIngredients(ingredientsArray)

//click event for adding ingredients
document.getElementById('addIngredient').addEventListener('click', event => {

    event.preventDefault()
    let ingredient = document.getElementById('ingredientName').value //getting ingredient entered by user
    let li = document.createElement('li')                                                   //creating list element to contain a button
    let ingredientElem = document.createElement('a')
    ingredientElem.className = 'button ingredient'                              //assigning it a class
    ingredientElem.innerHTML = ingredient
    li.append(ingredientElem)                                                               //inserting the button into the list element created above
    document.getElementById('ingredients').append(li)                       //inserting the list element with a button inside into the nav bar
    ingredientsArray.push(ingredient)                                                  //pushing the ingredient into ingredientsArray
    localStorage.setItem("ingredients", JSON.stringify(ingredientsArray));     //saving the updated ingredientsArray into localStorage

})

//click event for deleting ingredients
document.addEventListener('click', event => {

    if (event.target.classList.contains('ingredient')) {       //looking for click events specifically for the ingredients buttons in the nav Bar
        event.target.remove()                                               // if found remove button
        let name = event.target.innerHTML                       //getting the ingredient deleted
        for (let i = 0; i < ingredientsArray.length; i++) {     //looping through all elements within ingredientsArray
            if (ingredientsArray[i] === name) {                    //looking to find the index where the ingredient is located
                ingredientsArray.splice(i, 1)                              //removing that index from the array
                localStorage.setItem("ingredients", JSON.stringify(ingredientsArray)); //saving the updated ingredientsArray into localStorage
            }
        }
    }
})

//function used to remove all of the recipes from the ul
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


