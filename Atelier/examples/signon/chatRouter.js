const {Storage} = require('@google-cloud/storage')
const bucketName = 'gs://arachnoid-a42069.appspot.com';
const { v4: uuidv4 } = require('uuid');
BigInt.prototype.toJSON = function() {
  return this.toString();
}
async function upChatBackGround(req, res){
  console.log(req.file);
  if(req.file){
  //const destFileName = 'ChatBackground/'+req.user.user_id+'.jpg';
  //console.log(myUUID);
      const storage = new Storage();
      const newUUID = uuidv4();
      const destFileName = 'Cakes/'+newUUID+'.jpg';
      async function uploadFromMemory() {
          await storage.bucket(bucketName).file(destFileName).save(req.file.buffer);
        
          console.log(
            `${destFileName}  uploaded to ${bucketName}.`
          );
        }
        uploadFromMemory().catch(console.error);      
  }
}

module.exports =  {upChatBackGround}