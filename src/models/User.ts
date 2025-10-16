import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        isActive: { type: Boolean, default: true },
        firebaseUid: { type: String, required: false, unique: true }
    },
    { timestamps: true }
);

// InferSchemaType extrae el tipo de dato del schema
type UserType = InferSchemaType<typeof userSchema>;

// Infierer el tipo de dato del schema
const User = model<UserType>("User", userSchema);

export default User;