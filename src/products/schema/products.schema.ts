import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps: true}) 
export class Product {
    @Prop({type: String})
    title!: string

    @Prop({type: String})
    description!: string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'User'})
    user!: mongoose.Schema.Types.ObjectId
}

export const productsSchema = SchemaFactory.createForClass(Product)