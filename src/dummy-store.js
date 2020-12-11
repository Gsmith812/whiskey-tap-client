const STORE = {
    "recipes": [
        {
            "id": 4,
            "cocktail_name": "Wild Turkey",
            "cocktail_type": "Lowball",
            "whiskey_type": "Tennessee Whiskey",
            "description": null,
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 1,
            "user": "John"
        },
        {
            "id": 6,
            "cocktail_name": "Crazy Aces",
            "cocktail_type": "Lowball",
            "whiskey_type": "Single Malt Whisky",
            "description": null,
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 2,
            "user": "Jane"
        },
        {
            "id": 2,
            "cocktail_name": "Old Fashioned",
            "cocktail_type": "Lowball",
            "whiskey_type": "Bourbon Whiskey",
            "description": "Classic drink that needs no description",
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 3,
            "user": "Jason"
        },
        {
            "id": 5,
            "cocktail_name": "Something Sweet",
            "cocktail_type": "Snifter",
            "whiskey_type": "Japanese Whisky",
            "description": "Something sweet certainly...",
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 5,
            "user": "Louis"
        },
        {
            "id": 1,
            "cocktail_name": "Perfect Manhattan",
            "cocktail_type": "Martini",
            "whiskey_type": "Rye Whiskey",
            "description": "Best Straight up cocktail",
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 5,
            "user": "Louis"
        },
        {
            "id": 3,
            "cocktail_name": "Fancy Schmanzy",
            "cocktail_type": "Highball",
            "whiskey_type": "Irish Whiskey",
            "description": null,
            "date_created": "2020-12-06T03:32:49.725Z",
            "created_by": 6,
            "user": "Minous"
        }
    ],
    "ingredients": [
        {
            "id": 1,
            "ingredient_string": "2oz Rye Whiskey",
            "recipe_id": 1
        },
        {
            "id": 2,
            "ingredient_string": "2 dashes bitters",
            "recipe_id": 1
        },
        {
            "id": 3,
            "ingredient_string": "1/2 oz dry vermouth",
            "recipe_id": 1
        },
        {
            "id": 4,
            "ingredient_string": "1/2 oz sweet vermouth",
            "recipe_id": 1
        },
        {
            "id": 5,
            "ingredient_string": "3 oz bourbon",
            "recipe_id": 2
        },
        {
            "id": 6,
            "ingredient_string": "3 dashes of bitters",
            "recipe_id": 2
        },
        {
            "id": 7,
            "ingredient_string": "1 tsp sugar",
            "recipe_id": 2
        },
        {
            "id": 8,
            "ingredient_string": "1 tsp water",
            "recipe_id": 2
        },
        {
            "id": 9,
            "ingredient_string": "2 fancy tablets",
            "recipe_id": 3
        },
        {
            "id": 10,
            "ingredient_string": "3 oz Irish Whiskey",
            "recipe_id": 3
        },
        {
            "id": 11,
            "ingredient_string": "2 oz Tennessee Whiskey",
            "recipe_id": 4
        },
        {
            "id": 12,
            "ingredient_string": "3 wild turkey feathers",
            "recipe_id": 4
        },
        {
            "id": 13,
            "ingredient_string": "2 oz Japanese Whisky",
            "recipe_id": 5
        },
        {
            "id": 14,
            "ingredient_string": "1 part sugar",
            "recipe_id": 5
        },
        {
            "id": 15,
            "ingredient_string": "1 part spice",
            "recipe_id": 5
        },
        {
            "id": 16,
            "ingredient_string": "1 part everything nice",
            "recipe_id": 5
        },
        {
            "id": 17,
            "ingredient_string": "2 oz Single Malt Whisky",
            "recipe_id": 6
        },
        {
            "id": 18,
            "ingredient_string": "1 oz crazy stuff",
            "recipe_id": 6
        }
    ],
    "cocktail_steps": [
        {
            "id": 26,
            "step_content": "Chill Glass in freezer",
            "recipe_id": 1
        },
        {
            "id": 27,
            "step_content": "In a shaker with ice pour in ingredients",
            "recipe_id": 1
        },
        {
            "id": 28,
            "step_content": "Stir really well to mix together",
            "recipe_id": 1
        },
        {
            "id": 29,
            "step_content": "Take glass out of freezer",
            "recipe_id": 1
        },
        {
            "id": 30,
            "step_content": "Strain shaker contents into the glass",
            "recipe_id": 1
        },
        {
            "id": 31,
            "step_content": "Enjoy!",
            "recipe_id": 1
        },
        {
            "id": 32,
            "step_content": "Place sugar in empty glass",
            "recipe_id": 2
        },
        {
            "id": 33,
            "step_content": "Soak sugar with bitters",
            "recipe_id": 2
        },
        {
            "id": 34,
            "step_content": "Muddle sugar and bitters in glass",
            "recipe_id": 2
        },
        {
            "id": 35,
            "step_content": "Place single whiskey ice cube or fill glass with ice",
            "recipe_id": 2
        },
        {
            "id": 36,
            "step_content": "Pour Bourbon over ice",
            "recipe_id": 2
        },
        {
            "id": 37,
            "step_content": "Peel Orange and Garnish",
            "recipe_id": 2
        },
        {
            "id": 38,
            "step_content": "Do some stuff",
            "recipe_id": 3
        },
        {
            "id": 39,
            "step_content": "Make it crazy",
            "recipe_id": 3
        },
        {
            "id": 40,
            "step_content": "Wow so cool",
            "recipe_id": 3
        },
        {
            "id": 41,
            "step_content": "Greatest cocktail",
            "recipe_id": 4
        },
        {
            "id": 42,
            "step_content": "You can make it",
            "recipe_id": 4
        },
        {
            "id": 43,
            "step_content": "It's easy",
            "recipe_id": 4
        },
        {
            "id": 44,
            "step_content": "Just do it",
            "recipe_id": 4
        },
        {
            "id": 45,
            "step_content": "I don't know how to make this",
            "recipe_id": 5
        },
        {
            "id": 46,
            "step_content": "What am I doing?",
            "recipe_id": 5
        },
        {
            "id": 47,
            "step_content": "Sure this looks good",
            "recipe_id": 5
        },
        {
            "id": 48,
            "step_content": "Cool",
            "recipe_id": 6
        },
        {
            "id": 49,
            "step_content": "Calm",
            "recipe_id": 6
        },
        {
            "id": 50,
            "step_content": "Collected",
            "recipe_id": 6
        }
    ],
    "comments": [
        {
            "id": 1,
            "content": "Test Comment stuff here",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 1,
            "user_id": 3
        },
        {
            "id": 2,
            "content": "Another comment really due?",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 1,
            "user_id": 2
        },
        {
            "id": 3,
            "content": "Hello Commenters",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 4
        },
        {
            "id": 4,
            "content": "Hello Everyone",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 3
        },
        {
            "id": 5,
            "content": "Who are you?",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 2,
            "user_id": 5
        },
        {
            "id": 6,
            "content": "Hello World",
            "date_created": "2020-12-07T22:10:14.920Z",
            "recipe_id": 3,
            "user_id": 1
        }
    ],
    "users": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@yahoo.com",
            "password": "12345678",
            "date_of_birth": "1987-10-25T00:00:00.000Z",
            "date_created": "2020-12-06T02:38:02.250Z"
        },
        {
            "id": 2,
            "first_name": "Jane",
            "last_name": "Bro",
            "email": "janebro@gmail.com",
            "password": "82746293",
            "date_of_birth": "1976-12-13T00:00:00.000Z",
            "date_created": "2020-12-06T02:38:02.250Z"
        },
        {
            "id": 3,
            "first_name": "Jason",
            "last_name": "Good",
            "email": "jasongood@aol.com",
            "password": "82738274",
            "date_of_birth": "1999-01-22T00:00:00.000Z",
            "date_created": "2020-12-06T02:38:02.250Z"
        },
        {
            "id": 4,
            "first_name": "Michelle",
            "last_name": "Doherty",
            "email": "michelledoherty@msn.com",
            "password": "82768738",
            "date_of_birth": "1989-08-05T00:00:00.000Z",
            "date_created": "2020-12-06T02:38:02.250Z"
        },
        {
            "id": 5,
            "first_name": "Louis",
            "last_name": "Kitty",
            "email": "louiskitty@hotmail.com",
            "password": "83738467",
            "date_of_birth": "1996-11-17T00:00:00.000Z",
            "date_created": "2020-12-06T02:38:02.250Z"
        },
        {
            "id": 6,
            "first_name": "Minous",
            "last_name": "Kitty",
            "email": "minouskitty@yahoo.com",
            "password": "76584873",
            "date_of_birth": "1965-05-29T00:00:00.000Z",
            "date_created": "2020-12-06T02:38:02.250Z"
        },
    ],
    "cocktail_types": [
        "Martini",
        "Highball",
        "Lowball",
        "Snifter"
    ],
    "whiskey_types": [
        "Irish Whiskey",
        "Scotch Whisky",
        "Japanese Whisky",
        "Canadian Whisky",
        "Bourbon Whiskey",
        "Tennessee Whiskey",
        "Rye Whiskey",
        "Blended Whiskey",
        "Single Malt Whisky"
    ],
}

export default STORE;