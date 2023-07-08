const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const database = new sdk.Databases(client)

  const { tweetId, likes } = JSON.parse(req.payload)

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);

      let newTweet = {}
      if(tweetId){
        try{
          newTweet = await database.updateDocument(
            '64a43b523507d9096da9', //DB ID
            '64a43b6c4e27ecaf9bcc', // COLLECTION ID
            tweetId,
            { likes }
          )
        } catch(error){
          console.log(error)
          return res.json({error})
        }
      }

    }

  res.json({
    areDevelopersAwesome: true,
  });
};
