# tappr
> Welcome to TAPPR where every hour is happy hour

## Base Beer List API URL
https://api.punkapi.com/v2/

Rate limit is 3600 req / hour for each IP Address

Exceeding this limit will prevent the app from loading beer information

## Base TAPPR API URL
https://tappr-app-api.herokuapp.com/api

Database used to manage user registration and login access. Creating an account allows a user to save beers to their profile and perform CRUD operations on comments for their saved beers. When the API loads, a 200 response with the following message will appear:
```javascript
{
  "time": "Beer o' Clock"
}
```

Unrestricted routes can be access without a user token. All other routes require a valid user login for access

## User Routes

### Register a User (Unrestricted Route)
HTTP Request: POST

URL: /api/auth/register

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | No        | User ID, generated by DB                                |
| Username    | String  | Yes       | Username, must be unique                                |
| Password    | String  | Yes       | User password                                           |
| Age         | Number  | Yes       | User age, must be greater than 21                       |
| Bio         | Text    | No        | Optional user bio, defaults to `Craft beer enthusiast`  |
| User Image  | Text    | No        | Optional user avatar image URL                          |

##### Example
```javascript
{
  "username": "Brewski",
  "password": "pouroneout",
  "age:" 25,
  "bio": "On a mission to hit all the taps this nation has to offer",
  "user_image": "http://my-avatar.png"
}
```

#### Response
##### 201 (Created)
> Will receive a 201 response with the newly created user and their token if registration is successful
```javascript
{
  "user": {
    "id": 2,
    "username": "LagerThanLife",
    "password": "A hashed password that's super secret",
    "age": 25
    "bio": "Craft beer enthusiast",
    "user_image": "http://my-avatar.png"
  },
  "token": "Super secret token generated by JWT - will be a hashed string"
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided",
  "message": "Username and password fields are required"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "There was an error during user registration, please try again later",
  "error": "Server error information"
}
```

*** ***
### Login (Unrestricted Route)
HTTP Request: POST

URL: /api/auth/login

##### Body
| Name        | Type    | Required  | Description                 |
| ----------- | ------- | --------- | ----------------------------|
| Username    | String  | Yes       | Username, must be unique    |
| Password    | String  | Yes       | User password               |

##### Example
```javascript
{
  "username": "Brewski",
  "password": "pouroneout"
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a welcome message and the user token if the request is successful
```javascript
{
  "message": "Welcome LagerThanLife!",
  "token": "Super secret token generated by JWT - will be a hashed string"
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided",
  "message": "Username and password fields are required"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "There was an error during user login, please try again later",
  "error": "Server error information"
}
```

*** ***
### Logout (Unrestricted Route)
HTTP Request: GET

URL: /api/auth/logout

#### Response
##### 200 (OK)
> Will receive a 200 response with a successful logout message if the request is successful
```javascript
{
  "message": "Successfully logged out"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "Already logged out"
}
```

*** ***
### Get all Users
HTTP Request: GET

URL: /api/users

#### Response
##### 200 (OK)
> Will receive a 200 response with an array of users in the database if the request is successful
```javascript
[
    {
        "id": 1,
        "username": "TapList",
        "age": 25,
        "bio": "Craft beer enthusiast",
        "user-image": "http://my-avatar.png"
    },
    {
        "id": 2,
        "username": "HopStop",
        "age": 23,
        "bio": "Craft beer enthusiast",
        "user-image": "http://my-avatar.png"
    }
]
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid Credentials"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "error": "Server error information"
}
```

*** ***
### Get User by ID
HTTP Request: GET

URL: /api/users/:id

#### Response
##### 200 (OK)
> Will receive a 200 response with a user object including their saved beers in an array if the request is successful
```javascript
{
    "user": {
        "id": 1,
        "username": "TapList",
        "age": 25
        "bio": "Seeker of the best taps in all the land",
        "user_image": "http://my-avatar.png"
    },
    "beers": [
        {
            "name": "Red Oak Bavarian Amber Lager",
            "tagline": "Smooth and pure",
            "abv": 5
        },
        {
            "name": "Sam Adams Boston Lager",
            "tagline": "Full flavored lager",
            "abv": 5
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid Credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "error": "Server error information"
}
```

*** ***
### Update User Information
HTTP Request: PUT

URL: /api/users/:id

##### Body
| Name        | Type    | Required  | Description                                             |
| ----------- | ------- | --------- | ------------------------------------------------------  |
| ID          | Number  | Yes       | User ID, generated by DB                                |
| Username    | String  | Yes       | Username, must be unique                                |
| Password    | String  | Yes       | User password                                           |
| Age         | Number  | Yes       | User age, must be greater than 21                       |
| Bio         | Text    | No        | Optional user bio, defaults to `Craft beer enthusiast`  |
| User Image  | Text    | No        | Optional user avatar image URL                          |

##### Example
```javascript
{
  "id": 1,
  "username": "Brewski",
  "password": "t4pp3r",
  "age": 30,
  "bio": "Hydrating myself one beer at a time",
  "user-image": "http://my-new-avatar.png"
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with the updated user object if the request is successful
```javascript
{
    "id": 1,
    "username": "Brewski",
    "age": 30,
    "bio": "Hydrating myself one beer at a time",
    "user-image": "http://my-new-avatar.png"
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "message": "The user information could not be updated",
  "error": "Server error information"
}
```

*** ***
### Add a Beer to the User List
HTTP Request: POST

URL: /api/users/beers

##### Body
| Name        | Type    | Required  | Description                                                             |
| ----------- | ------- | --------- | ----------------------------------------------------------------------  |
| ID          | Number  | No        | Beer ID, generated by DB                                                |
| Name        | String  | Yes       | Name of the beer - from PunkAPI data                                    |
| Tagline     | Text    | No        | Tagline for the beer - from PunkAPI data, defaults to `An amazing brew` |
| Description | Text    | No        | Beer description - from PunkAPI data                                    |
| Image_URL   | String  | No        | Beer image URL - from PunkAPI data                                      |
| ABV         | Decimal | No        | Beer ABV - from PunkAPI data                                            |

##### Example
```javascript
{
  "name": "Red Oak Bavarian Amber Lager",
  "tagline": "Smooth and pure",
  "description": "Unpasteurized, unfiltered, pure Bavarian lager and the flagship beer of the Red Oak Brewery",
  "image_url": "https://redoakbrewery.com/wp-content/uploads/2019/04/Red-Oak-cropped.png",
  "abv": 5.0
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a user object including their saved beers in an array if the request is successful
```javascript
{
    "user": {
        "id": 1,
        "username": "Brewski",
        "age:" 30,
        "bio": "Hydrating myself one beer at a time",
        "user-image": "http://my-new-avatar.png"
    },
    "beers": [
        {
            "name": "Red Oak Bavarian Amber Lager",
            "tagline": "Smooth and pure",
            "abv": 5
        },
        {
            "name": "Sam Adams Boston Lager",
            "tagline": "Full flavored lager",
            "abv": 5
        },
        {
            "name": "White Claw Mango",
            "tagline": "Stay hydrated with a delicious, spiked, mango seltzer",
            "abv": 5
        },
        {
            "name": "Dos Equis",
            "tagline": "I don't always drink beer, but when I do, it's a XX",
            "abv": 5.5
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "User not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The user information could not be retrieved",
  "message": "The beer could not be added to the user profile",
  "error": "Server error information"
}
```

## Beer Routes

### Get all Beers (Unrestricted Route)
HTTP Request: GET

URL: /api/beers

Use for searching the database - must provide a query labeled as `name`. Set up to match names regardless of case as long as the input exists in our database.

##### Example URL
/api/beers?name=citradelic

#### Response
##### 200 (OK)
> Will receive a 200 response with an array of all beers in the database if the request is successful
```javascript
[
    {
        "id": 1,
        "name": "Red Oak Bavarian Amber Lager",
        "tagline": "Smooth and pure",
        "description": "Unpasteurized, unfiltered, pure Bavarian lager and the flagship beer of the Red Oak Brewery",
        "image_url": "https://redoakbrewery.com/wp-content/uploads/2019/04/Red-Oak-cropped.png",
        "abv": 5
    },
    {
        "id": 2,
        "name": "Blue Moon Belgian White",
        "tagline": "Refreshing wheat ale",
        "description": "A wheat beer brewed with Valencia orange peel for a subtle sweetness and bright, citrus aroma",
        "image_url": "https://www.bluemoonbrewingcompany.com/sites/bluemoon/files/styles/beers/public/beers/2018-06/BlueMoon-BelgianWhite.png?itok=AonO8W6_",
        "abv": 5.4
    },
    {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    }
]
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "error": "Server error information"
}
```

*** ***
### Get Beer by ID
HTTP Request: GET

URL: /api/beers/:id

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 1,
        "name": "Red Oak Bavarian Amber Lager",
        "tagline": "Smooth and pure",
        "description": "Unpasteurized, unfiltered, pure Bavarian lager and the flagship beer of the Red Oak Brewery",
        "image_url": "https://redoakbrewery.com/wp-content/uploads/2019/04/Red-Oak-cropped.png",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        },
        {
            "id": 3,
            "food_name": "Bruschetta"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Not my favorite lager"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "error": "Server error information"
}
```

*** ***
### Add a Beer
HTTP Request: POST

URL: /api/beers

##### Body
| Name        | Type    | Required  | Description                                         |
| ----------- | ------- | --------- | --------------------------------------------------  |
| ID          | Number  | No        | Beer ID, generated by DB                            |
| Name        | String  | Yes       | Name of the beer                                    |
| Tagline     | Text    | No        | Tagline for the beer, defaults to `An amazing brew` |
| Description | Text    | No        | Beer description                                    |
| Image_URL   | String  | No        | Beer image URL                                      |
| ABV         | Decimal | No        | Beer ABV                                            |
| Comment     | Text    | No        | Beer Notes / Comments                               |
| Food Name   | Text    | No        | Beer Food Pairing                                   |

##### Example
```javascript
{
	"name": "New Belgium Citradelic Tangerine IPA",
	"tagline": "Citrusy, slightly hoppy",
	"description": "Refreshing tangerine taste with a little bit of a hop spike to quench the thirst",
	"image_url": "https://www.newbelgium.com/globalassets/beer/citradelic/new_citradelic_globe_glass_can_1080x1080-copy.png",
	"abv": 6.0,
	"comment": "Refreshing, a good summer ale",
	"food_name": "Strawberry Salad"
}
```

#### Response

##### 201 (Created)
> Will receive a 201 response with the newly created beer if creation is successful
```javascript
{
  "id": 6,
  "name": "New Belgium Citradelic Tangerine IPA",
  "tagline": "Citrusy, slightly hoppy",
  "description": "Refreshing tangerine taste with a little bit of a hop spike to quench the thirst",
  "image_url": "https://www.newbelgium.com/globalassets/beer/citradelic/new_citradelic_globe_glass_can_1080x1080-copy.png",
  "abv": 6
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided",
  "message": "Beer must have a name"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer could not be created",
  "error": "Server error information"
}
```

*** ***
### Add a Beer Comment
HTTP Request: POST

URL: /api/beers/:id/comments

##### Body
| Name       | Type    | Required  | Description                                                                  |
| ---------- | ------- | --------- | ---------------------------------------------------------------------------  |
| ID         | Number  | No        | Comment ID, generated by DB                                                  |
| Comment    | Text    | Yes       | Username, must be unique                                                     |
| Beer ID    | Number  | Yes       | Beer ID that the comment pertains to                                         |
| User ID    | Number  | Yes       | User ID of comment creator, pulled from JSON Web Token Payload Subject data  |

##### Example
```javascript
{
  "comment": "Lighter lager that is super refreshing - new favorite",
  "beer_id": 1,
  "user_id": 1
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        },
        {
            "id": 3,
            "food_name": "Bruschetta"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Not my favorite lager"
        },
        {
            "id": 2,
            "comment": "Interesting, but refreshing"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The comment could not be created",
  "error": "Server error information"
}
```

*** ***
### Add a Beer Food Pairing
HTTP Request: POST

URL: /api/beers/:id/foods

##### Body
| Name       | Type    | Required  | Description               |
| ---------- | ------- | --------- | ------------------------  |
| ID         | Number  | No        | Food ID, generated by DB  |
| Food Name  | Text    | Yes       | Food name                 |

##### Example
```javascript
{
  "food_name": "Bruschetta"
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        },
        {
            "id": 3,
            "food_name": "Bruschetta"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Not my favorite lager"
        },
        {
            "id": 2,
            "comment": "Interesting, but refreshing"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The food could not be created",
  "error": "Server error information"
}
```

*** ***
### Update a Beer
HTTP Request: PUT

URL: /api/beers/:id

##### Body
| Name        | Type    | Required  | Description                                         |
| ----------- | ------- | --------- | --------------------------------------------------  |
| ID          | Number  | Yes       | Beer ID, generated by DB                            |
| Name        | String  | Yes       | Name of the beer                                    |
| Tagline     | Text    | No        | Tagline for the beer, defaults to `An amazing brew` |
| Description | Text    | No        | Beer description                                    |
| Image_URL   | String  | No        | Beer image URL                                      |
| ABV         | Decimal | No        | Beer ABV                                            |
| Comment     | Text    | No        | Beer Notes / Comments                               |
| Food Name   | Text    | No        | Beer Food Pairing                                   |

##### Example
```javascript
{
	"name": "New Belgium Citradelic Tangerine IPA",
	"tagline": "Citrusy, slightly hoppy",
	"description": "Refreshing tangerine taste with a little bit of a hop spike to quench the thirst",
	"image_url": "https://www.newbelgium.com/globalassets/beer/citradelic/new_citradelic_globe_glass_can_1080x1080-copy.png",
	"abv": 6.0,
	"comment": "Refreshing, a good summer ale",
	"food_name": "Strawberry Salad"
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        },
        {
            "id": 3,
            "food_name": "Bruschetta"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Not my favorite lager"
        },
        {
            "id": 2,
            "comment": "Tastes lighter than it looks"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The beer information could not be updated",
  "error": "Server error information"
}
```

*** ***
### Update a Comment
HTTP Request: PUT

URL: /api/beers/:id/comments/:commentid


##### Body
| Name       | Type    | Required  | Description                                                                  |
| ---------- | ------- | --------- | ---------------------------------------------------------------------------  |
| ID         | Number  | Yes       | Comment ID, generated by DB                                                  |
| Comment    | Text    | Yes       | Username, must be unique                                                     |
| Beer ID    | Number  | Yes       | Beer ID that the comment pertains to                                         |
| User ID    | Number  | Yes       | User ID of comment creator, pulled from JSON Web Token Payload Subject data  |

##### Example
```javascript
{
  "id": 1,
  "comment": "My new favorite lager",
  "beer_id": 1,
  "user_id": 1
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        },
        {
            "id": 3,
            "food_name": "Bruschetta"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Not my favorite lager"
        },
        {
            "id": 2,
            "comment": "Tastes lighter than it looks"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The comment could not be updated",
  "error": "Server error information"
}
```

*** ***
### Update a Food Pairing
HTTP Request: PUT

URL: /api/beers/:id/foods/:foodid


##### Body
| Name       | Type    | Required  | Description                  |
| ---------- | ------- | --------- | ---------------------------  |
| ID         | Number  | Yes       | Food ID, generated by DB     |
| Food Name  | Text    | Yes       | Food name                    |

##### Example
```javascript
{
  "id": 1,
  "food_name": "Bruschetta with Mozarella and Tomato"
}
```

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        },
        {
            "id": 3,
            "food_name": "Bruschetta with Mozarella and Tomato"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Not my favorite lager"
        },
        {
            "id": 2,
            "comment": "Tastes lighter than it looks"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The food could not be updated",
  "error": "Server error information"
}
```

*** ***
### Delete a Beer
HTTP Request: DELETE

URL: /api/beers/:id

#### Response
##### 200 (OK)
> Will receive a 200 response with an array of all beers in the database if request is successful
```javascript
{
  [
      {
          "id": 1,
          "name": "Red Oak Bavarian Amber Lager",
          "tagline": "Smooth and pure",
          "description": "Unpasteurized, unfiltered, pure Bavarian lager and the flagship beer of the Red Oak Brewery",
          "image_url": "https://redoakbrewery.com/wp-content/uploads/2019/04/Red-Oak-cropped.png",
          "abv": 5
      },
      {
          "id": 2,
          "name": "Blue Moon Belgian White",
          "tagline": "Refreshing wheat ale",
          "description": "A wheat beer brewed with Valencia orange peel for a subtle sweetness and bright, citrus aroma",
          "image_url": "https://www.bluemoonbrewingcompany.com/sites/bluemoon/files/styles/beers/public/beers/2018-06/BlueMoon-BelgianWhite.png?itok=AonO8W6_",
          "abv": 5.4
      },
      {
          "id": 3,
          "name": "Sam Adams Boston Lager",
          "tagline": "Full flavored lager",
          "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
          "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
          "abv": 5
      },
      {
          "id": 4,
          "name": "Dragon's Milk",
          "tagline": "Drink fire, drink milk - be one with the beast",
          "description": "A full-bodied stout with a smooth finish. A North Carolina staple, all dark beer lovers have to try this beer",
          "image_url": "https://wp.dragonsmilk.com/wp-content/uploads/2019/01/card-can-dm-2.png",
          "abv": 11
      }
  ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The beer could not be deleted",
  "error": "Server error information"
}
```

*** ***
### Delete a Comment
HTTP Request: DELETE

URL: /api/beers/:id/comments/:commentid

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        },
        {
            "id": 3,
            "food_name": "Bruschetta"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Interesting, but refreshing"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The comment could not be deleted",
  "error": "Server error information"
}
```

*** ***
### Delete a Food Pairing
HTTP Request: DELETE

URL: /api/beers/:id/foods/:foodid

#### Response
##### 200 (OK)
> Will receive a 200 response with a beer object including their food pairings and comments in an array if the request is successful
```javascript
{
    "beer": {
        "id": 3,
        "name": "Sam Adams Boston Lager",
        "tagline": "Full flavored lager",
        "description": "A distinctive balance of spicy hops, slightly sweet roasted malts, and a smooth finish",
        "image_url": "https://www.samueladams.com//app_media/SamAdamsRedux/2019-Rebrand/Beers/Boston-Lager/BostonLager_MiscStats_BtlPour.file?h=524&la=en&w=471&hash=BE64554F42E0E0CD8D517B24F4664B5F5C3F947F",
        "abv": 5
    },
    "food": [
        {
            "id": 1,
            "food_name": "Burgers"
        },
        {
            "id": 2,
            "food_name": "Chocolate and Caramel Cupcakes"
        }
    ],
    "comments": [
        {
            "id": 1,
            "comment": "Interesting, but refreshing"
        }
    ]
}
```

##### 400 (Bad Request)
> Will receive a 400 response if required information is missing from the body
```javascript
{
  "message": "No credentials provided"
}
```

##### 401 (Unauthorized)
> Will receive a 401 response if credentials are invalid
```javascript
{
  "message": "Invalid credentials"
}
```

##### 404 (Not Found)
> Will receive a 404 response if parameter ID is invalid
```javascript
{
  "message": "Beer not found"
}
```

##### 500 (Internal Server Error)
> Will receive a 500 response if there is a problem with the server
```javascript
{
  "message": "The beer information could not be retrieved",
  "message": "The food could not be deleted",
  "error": "Server error information"
}
```