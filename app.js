//api = https://www.themealdb.com/api/json/v1/1/search.php?s
function getValue() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
        .then(res => res.json())
        .then(data => gettingMatches(data));
    const gettingMatches = mealList => {
        //console.log(mealList.meals[0]);
        mealList.meals.forEach(meal => {
            const searchInput = document.getElementById("search_input").value;
            const result = meal.strMeal.match(searchInput);
            if (result === null) {
                const mealDivS = document.createElement('div');
                mealDivS.className = 'failure_box';
                const failure =
                    `<h3>SORRY! We Don't Provide This Meal</h3>
                    <h5>Instead Search This:</h5>
                    <ul>
                        <li>${meal.strMeal}</li>
                    </ul>`
                mealDivS.innerHTML = failure;
                document.getElementById("search_failure").appendChild(mealDivS);
                document.getElementById("Ingredients").style.display = 'none';

            }
            else {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'result_box';
                const eachMealPic =
                    `<img class="meal-pic" src="${meal.strMealThumb}"><br>
                    <h3>${meal.strMeal}</h3>`
                mealDiv.innerHTML = eachMealPic;
                document.getElementById("search_result").appendChild(mealDiv);
                document.getElementById("search_failure").style.display = 'none';
                document.querySelectorAll(".result_box").forEach(box => {
                    box.addEventListener('click', event => {
                        const ingredient = document.createElement('div');
                        ingredient.className = '';
                        const ingredients =
                            `<ul>
                                <li>${meal.strIngredient1}</li>
                            </ul>`
                        ingredient.innerHTML = ingredients;
                        document.getElementById("Ingredients").appendChild(ingredient);
                        document.getElementById("Ingredients").style.display = "block";
                    })
                })
            }
        });
    }
}