# The state of state management in ReactJS

## Assignment

Our engineering culture at Rover always strives to be on the cutting edge. It is what allows our small team to be able to punch above our weight class. Rover is about to embark on a complete web redesign in November. We have recently run into some issues with using Apollo Client for React, and given the ability to start from scratch we are re-evaluating our current architecture using Apollo as our state management solution & GraphQL client.

## Objective:

To gauge the candidate's ability to research and communicate their findings to the team in an efficient and effective way. Assume the team has minimal knowledge of the other state / client libraries for GraphQL. Discuss your findings over Zoom.

Some things to touch on:

-   What are the popular frameworks
-   When do you use one over the other? Can you mix solutions?
-   Are these frameworks compatible with Typescript? Is Typescript an afterthought or built in?
-   What does the development workflow look like for each?
-   Anything else you think is important

### Proposal:

Rover has currently hit an architecture issue with using Apollo, it is becoming increasingly difficult to remember to update internal caches of relationships or being forced to propagate callbacks to parent components to clear cache.

#### How Rover uses Apollo today

Data fetching is inlined with the component that requires the data. An example component would look like:

```tsx
const QUERY_PRODUCTS = gql`
    query {
        products {
            id
            title
            description
        }
    }
`

const Products: React.FC = () => {
    const { data, loading } = useQuery(QUERY_PRODUCTS)
    // ...

    return (
        <ul>
            {data.map((product, i) => (
                <li key={i}>{product.title}</li>
            ))}
        </ul>
    )
}
```

#### Issue

Although Apollo has a built-in memory cache that can automatically update the cache after calling a mutation it doesn't do this automatically for relationships when new values are added or deleted. Example if we had an Account with many Users and we add a new user to the account.

```graphql
query {
    account {
        users {
            id
            name
        }
    }
}
```

Initial State:

```json
{
    "account": {
        "id": 1,
        "users": [
            {
                "id": 1,
                "name": "Chris"
            },
            {
                "id": 2,
                "name": "Alex"
            }
        ]
    }
}
```

Mutation:

```graphql
mutation {
    userCreate(accountID: 1, name: "John") {
        id
        name
    }
}
```

Next State (invalid):

```json
{
    "account": {
        "id": 1,
        "users": [
            {
                "id": 1,
                "name": "Chris"
            },
            {
                "id": 2,
                "name": "Alex"
            }
        ]
    }
}
```

To accomplish this within Apollo it requires the following cache mutation:

```js
const currentAccountID = 1
useMutation(CREATE_USER_MUTATION, {
    update: (cache, result) => {
        if (!result.data) {
            return
        }

        cache.modify({
            id: cache.identify({
                __typename: 'Account',
                id: currentAccountID,
            }),
            fields: {
                users: cachedUsers => {
                    // Adds the new user created to the account
                    return [...cachedUsers, result.data]
                },
            },
        })
    },
})
```

This solution works for simple relationships but breaks down when there are multiple nested relationships. It's also hard to keep a mental model of all relationships and the model you are adding or deleting from them. How can Rover improve its current architecture given the above issue and the learnings you have discovered? Should Rover switch to a new state management solution why or why not? If Apollo is already a good solution what would you change architecturally to help prevent running into the above?
