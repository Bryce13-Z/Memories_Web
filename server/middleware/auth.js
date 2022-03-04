import jwt from "jsonwebtoken";

const secret = 'test';

// wants to like a post 
// click the like button => send request => auth middleware (next) => like controller



const auth = async (req, res, next) => {
  try {
    
    // 從request 的header中截取token，token的長度不超過500說明是自己的token，不然就是google的token
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    
    let decodedData;

    // 有token 且 isCustomAuth = true
    if (token && isCustomAuth) {
        // jwt.versify gives us the user name and user ID
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } 
    
    else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;