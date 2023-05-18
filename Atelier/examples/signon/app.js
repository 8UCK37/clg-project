const axios = require("axios")
var https = require('https');
var fs = require('fs');
var cors = require('cors')
const path = require('path')
var express = require('express')
  , util = require('util')
  , session = require('express-session')

require("dotenv").config()

let cakeHelper= require('./cakeHelper')
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const { PrismaClient } = require('@prisma/client');
const { response } = require("express");
const { json } = require("express");

const prisma = new PrismaClient()
const multer = require('multer');
const socketRunner = require('./socketRunner')
const { randomUUID } = require("crypto");
const auth  = require('./middleware/authMiddleware')
const ensureAuthenticated = auth.ensureAuthenticated
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + './../../public/profilePicture'))
  },
  filename: function (req, file, cb) {
    console.log(req.user)
    const uniqueSuffix = req.user.user_id
    cb(null, uniqueSuffix + '.' + 'jpg')
  }
})

const upload = multer({ storage: storage })


const http = require('http').createServer(app);
const io = require('socket.io')(http, {  
  cors: { 
    origins: ['http://localhost:4200']
  }
});

var app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cors())
app.use(session({
  secret: 'your secret',
  name: 'name of session id',
  resave: true,
  saveUninitialized: true
}));


app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/../../public'));

//saves a new user #endpoint
app.post('/saveuser', ensureAuthenticated, async function (req, res) {
  console.log("/saveuser called")
  const fetchUser = await prisma.User.findUnique({
    where: {
      id: req.user.user_id
    }
  })
  if (fetchUser == null) {
    // console.log("user not found ")

    const newUser = await prisma.user.create({
      data: {
        id: req.user.user_id,
        name: req.user.name,
        profilePicture: req.user.picture,
        gmailId: req.user.email,
        activeChoice: true,
        isAdmin: false,
        isConnected: true
      },
    })

    console.log("new user created db updated", newUser)
    // res.statusCode = 201
    res.send(JSON.stringify(newUser))
  } else {
    console.log("user exists")
    // res.statusCode(200)
    res.send(JSON.stringify(fetchUser))
  }

});
//returns user info #endpoint
app.post('/getUserInfo', ensureAuthenticated, async (req, res) => {
    //console.log("/getUserInfo called",req.body)
    try{
      let userData = await prisma.User.findUnique({
        where: {
          id: req.body.id
        },include:{
          userInfo:true
        }
      })
      //console.log(userData)
      res.send(JSON.stringify(userData));
    }
    catch(e){
      console.log(e)
      res.sendStatus(400)
    }
});

app.put('/updateUserInfo', ensureAuthenticated, async (req, res) => {
  //console.log("/getUserInfo called",req.body)
  try{
    let userData = await prisma.UserInfo.update({
      where: {
        id: req.user.user_id
      },
      data: {
        userInfo:true
      }
    })
    console.log(userData)
    res.send(JSON.stringify(userData));
  }
  catch(e){
    console.log(e)
    res.sendStatus(400)
  }
});

app.post("/saveUserInfo" , ensureAuthenticated , async (req , res)=>{
  try {
    const userId = req.user.user_id;

    await prisma.userInfo.deleteMany({
      where: { User: { id: userId } },
    });

    
  } catch (error) {
    console.log(error);
    
  }
 let userData = await prisma.User.update({
  where:{
    id: req.user.user_id
  },
  data:{
    userInfo:{
      create:req.body  
    }
  },
  include: { userInfo: true }
 })
  res.sendStatus(200)
})
//updates displayname of the user #endpoint
app.post('/userNameUpdate', ensureAuthenticated, urlencodedParser, async (req, res) => {
  console.log(req.body.name);
  const updateUserName = await prisma.User.update({
    where: {
      id: req.user.user_id
    },
    data: {
      name: req.body.name
    }
  })
  res.sendStatus(200);
});

app.get("/userList", ensureAuthenticated, async (req, res) => {
  const result = await prisma.User.findMany({
    where:{
      NOT:{
        id:req.user.user_id
      }
    }
  })

  res.send(JSON.stringify(result));
})


//TODO:testing function for notification #endpoint
app.post("/sendNoti", ensureAuthenticated, async (req, res) => {
  console.log(req.user.user_id);
  console.log(req.body.receiver_id);
  socketRunner.sendNotification(io, "poke", req.user.user_id, req.body.receiver_id,"null")
  res.sendStatus(200);
});
//testing endpoint with no ensureauth
app.get("/micCheck", async (req, res) => {
  console.log("mic-check hit")
  res.send("works");
});



app.get("/serverTest", async (req, res) => {
  res.send("works");
});


app.post('/searchCakes', urlencodedParser, async function (req, res) {
  const jsonObject = req.body;

  const searchresult = await prisma.Cakes.findMany({
    where: {
      OR: [
        {
          name: {
            contains: jsonObject.searchTerm,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            contains: jsonObject.searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: {
      id: 'asc',
    },
  });

  res.send(JSON.stringify(searchresult));
  //res.sendStatus(200);
});


app.post('/addToCart', ensureAuthenticated, async function (req, res) {
  console.log(req.body.data)
  const cart=await prisma.Cart.upsert({
    where:{
      userId:req.user.user_id
    },
    update: { items: req.body.data },
    create: {
      userId:req.user.user_id, 
      items: req.body.data 
    },
  })

  res.sendStatus(200);
});
app.get('/getCart', ensureAuthenticated, async function (req, res) {
  console.log(req.body.data)
  const cart=await prisma.Cart.findUnique({
    where:{
      userId:req.user.user_id
    }
  })
  res.send(JSON.stringify(cart));
});

app.post('/checkout', ensureAuthenticated, async function (req, res) {
  console.log(req.body)
  let order = await prisma.Orders.create({
    data:{
      userId:req.user.user_id,
      items:req.body.items,
      requests:req.body.request,
      deliveryDate:req.body.date,
      status:'pending'
    }
  })

  res.sendStatus(200);
});

app.get('/getOrders', ensureAuthenticated, async function (req, res) {
  
  const orders= await prisma.Orders.findMany({
    include: {
      user: true,
    },orderBy:{
      id:'asc'
    }
  })
  res.send(JSON.stringify(orders));
});

app.get('/getOrdersForUser', ensureAuthenticated, async function (req, res) {
  
  const orders= await prisma.Orders.findMany({
    where:{
      userId:req.user.user_id
    },orderBy:{
      id:'asc'
    }
  })
  res.send(JSON.stringify(orders));
});

app.post('/updateOrderStatus', ensureAuthenticated, async function (req, res) {
  
  const orders= await prisma.Orders.update({
    where:{
      id:parseInt(req.body.orderId)
    },
    data:{
      status:req.body.status,
    }
  })
  res.send(JSON.stringify(orders));
});
//selfexplanatory #endpoint
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});



//returns steam account data for anybody #endpoint



//returns the offline/pnline choice from the user table #endpoint
app.get('/activeState', ensureAuthenticated, async (req, res) => {
  let activeStateData = await prisma.User.findMany({
    where: {
      id: req.user.user_id
    },
    select: {
      activeChoice: true
    }
  })
  //console.log(activeStateData)
  res.send(JSON.stringify(activeStateData));
});

//updates the user'c choice of active state in the user table #endpoint
app.post('/activeStateChange', ensureAuthenticated, urlencodedParser, async (req, res) => {
  const jsonObject = req.body;
  const updateUser = await prisma.User.update({
    where: {
      id: req.user.user_id,
    },
    data: {
      activeChoice: jsonObject.state,
    },
  })
  const userlist = await prisma.User.findMany({
    where:{
      NOT:{
        id:req.user.user_id
      }
    }
  })
  //console.log(userlist)
  userlist.forEach(user => {
    if (jsonObject.state) {
      socketRunner.sendNotification(io, "online", req.user.user_id, user.id,"null")
    } else {
      socketRunner.sendNotification(io, "disc", req.user.user_id, user.id,"null")
    }
  });
});

//returns chats i.e texts #endpoint
app.get('/chatData', ensureAuthenticated, async (req, res) => {
  let fetchedChat = await prisma.Chat.findMany({
    where: {
      OR: [
        {
          sender: req.user.uid,
          receiver: req.query.friendId
        },
        {
          sender: req.query.friendId,
          receiver: req.user.uid
        }
      ]
    }
  })
  res.send(JSON.stringify(fetchedChat))
});

//returns active conversations #endpoint
app.get('/getChats', ensureAuthenticated, async (req, res) => {
  const fetchedChat = await prisma.$queryRaw`
    SELECT 'sent' as chat_type, c.sender, c.receiver, u.*
    FROM public."Chat" c
    JOIN public."User" u ON u.id = c.receiver
    WHERE c.sender = ${req.user.uid}
    UNION
    SELECT 'received' as chat_type, c.sender, c.receiver, u.*
    FROM public."Chat" c
    JOIN public."User" u ON u.id = c.sender
    WHERE c.receiver = ${req.user.uid}
  `
  res.send(JSON.stringify(fetchedChat))
});


app.post("/cakeImages", ensureAuthenticated, upload.single('cakeimage'), (req, res) => {
  console.log("chat",req.user.user_id)
  cakeHelper.uploadCake(req,res,prisma)
  res.sendStatus(200);
});

app.post("/chat/Images", ensureAuthenticated, upload.single('chatimages'), (req, res) => {
  cakeHelper.uploadImage(req,res,prisma)
  res.sendStatus(200);
});

app.get('/getCakesList', async (req, res) => {
  try {
    const cakesList = await prisma.Cakes.findMany();
    res.json(cakesList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/getCakeById', async (req, res) => {
  console.log(req.body.cakeId)
  try {
    const cakes = await prisma.Cakes.findUnique({
      where:{
        id:parseInt(req.body.cakeId)
      }
    });
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


socketRunner.execute(io)

app.listen(3000);
http.listen(5000, () => console.log(`Listening on port ${3000}`));
app.set('socketIo',io)

