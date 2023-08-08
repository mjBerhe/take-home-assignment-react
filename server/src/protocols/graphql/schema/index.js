const fs = require('fs')
const path = require('path')
const { gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const { permissions, errorHandler } = require('./middleware')

const glob = (dir, pattern) => {
    return fs
        .readdirSync(dir)
        .filter(file => file.match(pattern) !== null)
        .map(file => fs.readFileSync(path.join(dir, file), 'utf8'))
}

// Read anything that ends with .gql and merge them together
const typeDefs = glob(path.join(__dirname, 'typeDefs'), /.*.gql$/).map(f => gql(f))
const resolvers = require('./resolvers')
const scalars = require('./scalars')

const schema = makeExecutableSchema({ typeDefs, resolvers: { ...resolvers, ...scalars } })

const makeSchema = (middlewares = []) => {
    return applyMiddleware(schema, ...middlewares, permissions, errorHandler)
}

module.exports = makeSchema
