import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productsSchema } from './schema/products.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: productsSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService],
})

export class ProductsModule {}
