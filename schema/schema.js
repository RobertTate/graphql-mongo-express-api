const graphql = require('graphql');
const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = graphql;

// dummy data:
const BOOKS = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Each', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
]

const AUTHORS = [
  { name: 'Patrick Rothfuss', age: 44, id: '1'},
  { name: 'Brandon Sansderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3'},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: { 
        type: AuthorType,
        resolve(parent, args) {
          return AUTHORS.find(author => parent.authorId === author.id);
        }
      }
    }
  }
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          return BOOKS.filter(book => book.authorId === parent.id);
        }
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BOOKS;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return AUTHORS;
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get book data from db or other source
        return BOOKS.find(book => book.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get author data from db or other source
        return AUTHORS.find(author => author.id === args.id);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})