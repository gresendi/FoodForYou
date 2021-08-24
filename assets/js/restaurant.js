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