let savedRecipe = JSON.parse(localStorage.getItem('savedRecipe')) || []                         //getting all of  previously saved recipes

//Function to renderFavorites
function renderFavorites() {
    let i = 0 //index used to create specific classes
    let slider = document.getElementById('slider')
    removeAllChildNodes(slider)                          //removing any favorite recipes previously loaded

    savedRecipe.forEach(recipe => {                     //llooping through all recipes in savedRecupe   


        let listItem = document.createElement('li') //creating list Element 
        //Creating card based off of data provided from savedRecipe
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
        document.getElementById('slider').append(listItem)          //adding favoriteRecipe card to slider


    });

}

//function for the removal of all child elements within an element
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//event listener to remove favoriteRecipe
document.addEventListener('click', event => {

    for (i = 0; i < savedRecipe.length; i++) {
        if (event.target.classList.contains(`delete${i}`)) {        //looking for a click event where the button contains the class 'delete'+i, i is the specific recipe 

            savedRecipe.splice(i, 1) //if deletei does exist then remive that recipe from the sacedRecipes array
            localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe)); // save the updated savedRecipes array into local storage
            renderFavorites()
        }
    }
})

//render favorite recipes onto the page if there are any 
renderFavorites()
