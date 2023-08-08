# Rest

## Authentication

When accessing protected endpoints you must supply the following header in the request:

```
Authorization: Bearer ${accessToken}
```

## Login

Generate a new session by providing an email and password.

```
POST /authenticate
Headers:
    Content-Type: application/json

Body:
{
    email: string,
    password: string
}

Returns:
{
    accessToken: string,
    refreshToken: string,
    expiresAt: Date
}
```

## Refreshing a Session

Sessions eventually expire. To refresh the session provide the accessToken and the refreshToken to generate a new session.

```
POST /refresh
Headers:
    Content-Type: application/json
Body:
{
    accessToken: string,
    refreshToken: string
}

Returns:
{
    accessToken: string,
    refreshToken: string,
    expiresAt: Date
}
```

## Products

```
GET /products
Headers:
    Authorization: Bearer ${accessToken}
Returns:
[
    {
        id: number
        title: string
        description: string
        price: number
        currency: string
    }
]
```

# GraphQL

It is recommended that you visit the http://localhost:8080/graphql and explore the mutations & queries.

## Authentication

When accessing protected queries you must supply the following header in the request:

```
Authorization: Bearer ${accessToken}
```
