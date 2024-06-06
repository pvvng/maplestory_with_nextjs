import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req :NextApiRequest, res :NextApiResponse){

  if(req.method !== 'POST'){
    return res.status(500).json('뭔가뭔가임');
  }

  let userID = req.body._id
  let 바꿀거 = req.body
  delete 바꿀거._id;
  console.log(바꿀거)

  const db = (await connectDB).db('maple-bgm');
  let result = await db.collection('userdata').updateOne(
    { _id : new ObjectId(userID) }, 
    { $set : 바꿀거 } 
  );

  return res.status(200).json('왔음');

}