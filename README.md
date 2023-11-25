# assignmentTwo

## Library Used 

*bcrypt
*cors
*dotenv
*express
*mongoose
*zod

## Scripts

*start:prod
*start:dev
*build
*lint:fix
*lint
*prettier
*prettier:fix


## Routes

### create user
method : post
```
http://localhost:5000/api/users
```
{
    "user": {
        "userId": 4,
        "username": "dfgdfg",
        "password": "mypassword",
        "fullName": {
            "firstName": "dfgfgg",
            "lastName": "dfgfd"
        },
        "age": 20,
        "email": "rupok@example.com",
        "isActive": true,
        "hobbies": [
            "Coding",
            "Gardening"
        ],
        "address": {
            "street": "madhupur bazar Joseph",
            "city": "Pallekelle",
            "country": "Homeland"
        },
        "orders": []
    }
}

### get user
method : get
```
http://localhost:5000/api/users

```
### get single user
method : get
```
http://localhost:5000/api/users/3
```

### update user
method : put
```
http://localhost:5000/api/users/3
```

{
  "username": "rupok1",
  "password": "mypassword",
  "fullName": {
    "firstName": "Rupok",
    "lastName": "Deb"
  },
  "age": 20,
  "email": "rupok@example.com",
  "isActive": true,
  "hobbies": ["Coding", "Gardening"],
  "address": {
    "street": "madhupur bazar Joseph",
    "city": "Pallekelle",
    "country": "Homeland"
  },
  "orders": [
    {
      "productName": "Product A",
      "price": 20,
      "quantity": 2
    },
    {
      "productName": "Product B",
      "price": 30,
      "quantity": 1
    }
  ]
}


### delete user
method : delete
```
http://localhost:5000/api/users/3
```


### add product 
method : put
```
http://localhost:5000/api/users/3/orders
```

### get product 
method : get
```
http://localhost:5000/api/users/3/orders
```
### total product price 
method : get
```
http://localhost:5000/api/users/1/orders/total-price
```