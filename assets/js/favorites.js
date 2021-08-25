let savedRecipe = JSON.parse(localStorage.getItem('savedRecipe')) || []
console.log(savedRecipe)



function renderFavorites() {
    let i = 0
    let slider = document.getElementById('slider')
    removeAllChildNodes(slider)
    savedRecipe.forEach(recipe => {


        let listItem = document.createElement('li')

        listItem.innerHTML = `

                 <div class="uk-card uk-card-primary">
            <div class="uk-card-media-top">
             <img src ="${recipe.image}" alt ="${recipe.name}">
              </div>
            <div class="uk-card-body">
                <h1>${recipe.name}</h1>
                <p>${recipe.summary}</p>
                <hr>
                   <h1>Instructions</h1>
                <p>${recipe.instructions}</p>
            
            <button class="uk-button uk-button-link delete${i++}">Remove</button></div>
            </div>

 
                `


        document.getElementById('slider').append(listItem)


    });

}

//function for the removal of all child elements within an element
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


renderFavorites()

document.addEventListener('click', event => {

    for (i = 0; i < savedRecipe.length; i++) {
        if (event.target.classList.contains(`delete${i}`)) {
        
                    savedRecipe.splice(i, 1)
                    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
                    renderFavorites()
                }
            }
            // renderSlides(ingredientsArray)

         
        
})