// In your gatsby-config.js
module.exports = {
  plugins: [
    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "GETLOLLIES",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "getlollies",
        // Url to query from
        url: "http://localhost:8888/.netlify/functions/graphqlServerForLolly",
      }
    }
  ]
}