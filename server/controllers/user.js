
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 通過request中的email來查找 對應的user
    const oldUser = await UserModel.findOne({ email });
    // 判斷user存不存在
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    //user存在，匹對request中的password 和 db中找到的password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    //password 不匹配，response回復錯誤信息
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    //password 匹配， 用jwt.sign()製作token，併將token放入response中回傳
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    res.status(200).json({ result: oldUser, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // 查找是否有這個user
    const oldUser = await UserModel.findOne({ email });
    // user存在，回傳信息 user 已存在
    if (oldUser) return res.status(400).json({ message: "User already exists" });
    // user不存在，首先加密password，然後用UserModel create用戶信息到db，最後製作token，將token放入response中
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};