import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productsSchema } from './schema/products.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: productsSchema}]), UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})

export class ProductsModule {}
