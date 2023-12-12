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
\*prettier:fix

## Routes

### create user

method : post

```
https://assignment-two-lac.vercel.app/api/users
```

```
{
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
```

### get user

method : get

```
https://assignment-two-lac.vercel.app/api/users

```

### get single user

method : get

```
https://assignment-two-lac.vercel.app/api/users/3
```

### update user

method : put

```
https://assignment-two-lac.vercel.app/api/users/3
```

```
{

"age": 20,

}
```

### delete user

method : delete

```
https://assignment-two-lac.vercel.app/api/users/3
```

### add product

method : put

```
https://assignment-two-lac.vercel.app/api/users/3/orders
```

### get product

method : get

```
https://assignment-two-lac.vercel.app/api/users/3/orders
```

### total product price

method : get

```
https://assignment-two-lac.vercel.app/api/users/1/orders/total-price
```
