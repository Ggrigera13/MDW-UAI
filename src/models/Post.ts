import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true }
    }, 
    { timestamps: true }
);

type PostType = InferSchemaType<typeof postSchema>;

const Post = model<PostType>("Post", postSchema);

export default Post;