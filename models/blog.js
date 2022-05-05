import mongoose from "mongoose";
const Schema = mongoose.Schema;
// import { Review } from "./review.js";
import { User } from "./user.js";

// const ImageSchema = new Schema({
  
//     url: String,
//     filename: String
  
// })

// ImageSchema.virtual('thumbnail').get(function(){
//   return this.url.replace('/upload', '/upload/w_200'); 
// })

const BlogSchema = new Schema({
  title: String,
  description: String,
  time: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// BlogSchema.post("findOneAndDelete", async function (doc) {
//   if (doc) {
//     await Review.deleteMany({
//       _id: {
//         $in: doc.reviews,
//       },
//     });
//   }
// });

export const Blog = mongoose.model("Blog", BlogSchema);