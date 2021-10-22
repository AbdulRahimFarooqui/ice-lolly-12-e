exports.onCreatePages = async ({ page, actions }) => {
  const { createPage } = actions;
  if(page.path.match(/^\/lollies/)){
    page.matchPath = "/lollies/*";
    createPage(page)
  }
  //can remove the word 'query'
  // const result = await graphql(`
  //   query {
  //     getlollies {
  //       getlollies {
  //         colorBottom
  //         colorTop
  //         colorMid
  //         message
  //         path
  //         reciepentName
  //         sendersName
  //       }
  //     }
  //   }
  // //   `)
  // console.log("result fetched: ", result)
  // result.map((val,id)=>{
  //     createPage({
  //         path:`/lollies/${val.path}`,
  //         component:path.resolve('./src/templates/lollyTemplate.js'),
  //         context:{
  //             //check this item:val 
  //             item:val
  //         }
  //     })
  // })
}