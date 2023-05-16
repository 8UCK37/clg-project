const {Storage} = require('@google-cloud/storage')
const bucketName = 'gs://arachnoid-a42069.appspot.com';
const { v4: uuidv4 } = require('uuid');
BigInt.prototype.toJSON = function() {
  return this.toString();
}
async function uploadCake(req, res,prisma){
  console.log(req.file);
  let body = JSON.parse(req.body.data)
  console.log(body.data);
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
            
          const photoUrl=`https://firebasestorage.googleapis.com/v0/b/arachnoid-a42069.appspot.com/o/Cakes%2F${newUUID}.jpg?alt=media&token=6febc586-490f-40f2-8400-64009ce1a02c`
          let newcake = await prisma.Cakes.create({
            data :{
                photoUrl:photoUrl,
                name:body.data.name,
                description:body.data.description,
                size:body.data.size,
                price:body.data.price,
                category:body.data.category,
                theme:body.data.theme,
                tags:body.data.tags,
            }
        })

        }
        uploadFromMemory().catch(console.error);      

        
  }
}

module.exports =  {uploadCake}