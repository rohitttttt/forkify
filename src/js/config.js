
export const apiConfig = {
    key: { 
        foodToFork: '551b20380c935de728283ad59b3686e4',
        theMealDb: '1'
    },
    url: { 
        foodToFork: 'https://www.food2fork.com/api/',
        theMealDb: 'https://www.themealdb.com/api/json/v1/'
    }
}

// export const apiKeyFoodToFork = '551b20380c935de728283ad59b3686e4';
// export const apiUrlFoodToFork = 'https://www.food2fork.com/api/';


// export const apiKeyTheMealDb = '1';
// export const apiUrlTheMealDb = 'https://www.themealdb.com/api/json/v1/';

/*
 
theMealDb.com

Api for vegitarian recipies
https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian

Output
{
meals: [
{
strMeal: "Baingan Bharta",
strMealThumb: "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
idMeal: "52807"
}
    ]
}

Api for Indian recipies
https://www.themealdb.com/api/json/v1/1/filter.php?a=indian

Output
{
meals: [
{
strMeal: "Baingan Bharta",
strMealThumb: "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
idMeal: "52807"
}
    ]
}

Api for Recipe Detail
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

{
meals: [
{
idMeal: "52807",
strMeal: "Baingan Bharta",
strDrinkAlternate: null,
strCategory: "Vegetarian",
strArea: "Indian",
strInstructions: "Rinse the baingan (eggplant or aubergine) in water. Pat dry with a kitchen napkin. Apply some oil all over and keep it for roasting on an open flame. You can also grill the baingan or roast in the oven. But then you won't get the smoky flavor of the baingan. Keep the eggplant turning after a 2 to 3 minutes on the flame, so that its evenly cooked. You could also embed some garlic cloves in the baingan and then roast it. 2. Roast the aubergine till its completely cooked and tender. With a knife check the doneness. The knife should slid easily in aubergines without any resistance. Remove the baingan and immerse in a bowl of water till it cools down. 3. You can also do the dhungar technique of infusing charcoal smoky flavor in the baingan. This is an optional step. Use natural charcoal for this method. Heat a small piece of charcoal on flame till it becomes smoking hot and red. 4. Make small cuts on the baingan with a knife. Place the red hot charcoal in the same plate where the roasted aubergine is kept. Add a few drops of oil on the charcoal. The charcoal would begin to smoke. 5. As soon as smoke begins to release from the charcoal, cover the entire plate tightly with a large bowl. Allow the charcoal smoke to get infused for 1 to 2 minutes. The more you do, the more smoky the baingan bharta will become. I just keep for a minute. Alternatively, you can also do this dhungar method once the baingan bharta is cooked, just like the way we do for Dal Tadka. 6. Peel the skin from the roasted and smoked eggplant. 7. Chop the cooked eggplant finely or you can even mash it. 8. In a kadai or pan, heat oil. Then add finely chopped onions and garlic. 9. Saute the onions till translucent. Don't brown them. 10. Add chopped green chilies and saute for a minute. 11. Add the chopped tomatoes and mix it well. 12. Bhuno (saute) the tomatoes till the oil starts separating from the mixture. 13. Now add the red chili powder. Stir and mix well. 14. Add the chopped cooked baingan. 15. Stir and mix the chopped baingan very well with the onion­tomato masala mixture. 16. Season with salt. Stir and saute for some more 4 to 5 minutes more. 17. Finally stir in the coriander leaves with the baingan bharta or garnish it with them. Serve Baingan Bharta with phulkas, rotis or chapatis. It goes well even with bread, toasted or grilled bread and plain rice or jeera rice.",
strMealThumb: "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
strTags: "Spicy,Bun,Calorific",
strYoutube: "https://www.youtube.com/watch?v=-84Zz2EP4h4",
strIngredient1: "Aubergine",
strIngredient2: "Onion",
strIngredient3: "Tomatoes",
strIngredient4: "Garlic",
strIngredient5: "Green Chili",
strIngredient6: "Red Chili Powder",
strIngredient7: "Oil",
strIngredient8: "Coriander Leaves",
strIngredient9: "salt",
strIngredient10: "",
strIngredient11: "",
strIngredient12: "",
strIngredient13: "",
strIngredient14: "",
strIngredient15: "",
strIngredient16: "",
strIngredient17: "",
strIngredient18: "",
strIngredient19: "",
strIngredient20: "",
strMeasure1: "1 large",
strMeasure2: "½ cup ",
strMeasure3: "1 cup",
strMeasure4: "6 cloves",
strMeasure5: "1",
strMeasure6: "¼ teaspoon",
strMeasure7: "1.5 tablespoon",
strMeasure8: "1 tablespoon chopped",
strMeasure9: "as required",
strMeasure10: "",
strMeasure11: "",
strMeasure12: "",
strMeasure13: "",
strMeasure14: "",
strMeasure15: "",
strMeasure16: "",
strMeasure17: "",
strMeasure18: "",
strMeasure19: "",
strMeasure20: "",
strSource: "http://www.vegrecipesofindia.com/baingan-bharta-recipe-punjabi-baingan-bharta-recipe/",
dateModified: null
}
]
}

*/

