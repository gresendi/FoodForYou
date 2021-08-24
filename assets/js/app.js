//array to store recipe results
let results = JSON.parse(localStorage.getItem('results')) || []
let ingredientsArray = JSON.parse(localStorage.getItem('ingredients')) || []

let apiKey = ['75bd90824a3a4624855632ca25d2803b', '6b9d0e1539434e12ab8da9fd6d0a1184', '10692f6066e94188b3a428c935d5bab5', '654230d7c6694093a69b1921f33789a0', '7a0d026544114effb86382cfa588cd7a', 'e5a2cf5f3401441aba72a1c383214705', '81ce8ed43c26458abb7e9c40cd19eda8', '41a14134f83a4f7386c1344e5a69ddcd', '8749340965d3428586c18ba074e0c4de', '68c5a0da0f5f493ca287426de7a1b0dc', 'c5aa3e9b829b464fbcfa7de12c1af17f']
// let ingredients = 'steak,+lamb,+garlic'

//array of ingredients


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
