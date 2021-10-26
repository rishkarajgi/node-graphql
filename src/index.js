const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length
                const link = {
                    id: `link-${idCount++}`,
                    description: args.description,
                    url: args.url
                }
            links.push(link)
            return link
        },
        update: (parent, args) => {
            link = links.filter(obj => {
                return args.id === obj.id;   
                }).map(obj => {
                    obj.description = args.description
                    obj.url = args.url
                })
            return link

        },
        delete: (parent, args) => {
            const index = links.findIndex(x => x.id === args.id);
            const link = links[index]
            if (index !== undefined) links.splice(index, 1);
            return link
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers
})

server
    .listen()
    .then(({ url }) => 
    console.log(`Server is running on ${url}`)
);