const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb');
const axios = require('axios')
const q = faunadb.query;
const shortid = require('shortid')

require('events').EventEmitter.defaultMaxListeners = 4000;

const typeDefs = gql`
  type Query {
    hello: String
    getlollies: [Lolly]
    lollyByPath(link:String):Lolly
  }
  type Lolly {
    reciepentName: String!
    message: String!
    sendersName:String!
    colorTop: String!
    colorMid: String!
    colorBottom: String!
    path: String!
  }

  type Mutation{
    createLolly(reciepentName: String!,message: String!,sendersName:String!,colorTop: String!,colorMid: String!,colorBottom: String!):Lolly
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return 'hello world'
    },
    getlollies: async () => {
      //add process.env.SECRET
      const client = new faunadb.Client({ secret: 'fnAEPn8cZrACC_5HPUn5DbIjIAXsxndG3QZEniZL' });

      var result = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("allLollies"))),
          q.Lambda(x => q.Get(x))
        )
      )
      console.log("getlollies satrted in SERVER!!!, result:", result)
      return result.data.map(d => {
        return {
          reciepentName: d.data.reciepentName,
          message: d.data.message,
          sendersName: d.data.sendersName,
          colorTop: d.data.colorTop,
          colorMid: d.data.colorMid,
          colorBottom: d.data.colorBottom,
          path: d.data.path
        }
      })
    },
    lollybyPath: async (_, { link }) => {
      const result = await client.query(
        query.Get(query.Match(query.Index("lolly_by_path"), link))
      )
      return result.data
    }
  },
  Mutation: {
    createLolly: async (_, args) => {
      const client = new faunadb.Client({ secret: 'fnAEPn8cZrACC_5HPUn5DbIjIAXsxndG3QZEniZL' })
      const id = shortid.generate();
      args.path = id;

      const result = await client.query(
        q.Create(q.Collection('lolly'), {
          data: args
        })
      );

      //call netlify BUILD_HOOK to start a new
      await axios.post('https://api.netlify.com/build_hooks/5d46fa20da4a1b70047f2f04')
      console.log("result: ", result);
      return {
        id: result.ref.id,
        c1: result.data.c1,
        c2: result.data.c2,
        c3: result.data.c3,
        sender: result.data.sender,
        rec: result.data.rec,
        message: result.data.message,
        link: result.data.link
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
