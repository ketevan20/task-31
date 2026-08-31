import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from './schema/products.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productsModel: Model<any>, private usersService: UsersService) { }

  async create(userId: string, createProductDto: CreateProductDto) {
    const user = await this.usersService.findOne(userId)
    const newProduct = await this.productsModel.create({ ...createProductDto, user: user._id })
    await this.usersService.addProduct(userId, newProduct._id)
    return newProduct;
  }

  findAll() {
    return this.productsModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException()
    const productById = await this.productsModel.findById(id)
    if (!productById) throw new BadRequestException()
    return productById;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!isValidObjectId(id)) throw new BadRequestException()
    const findByIdAndUpdate = await this.productsModel.findByIdAndUpdate(id, updateProductDto, { new: true })
    if (!findByIdAndUpdate) throw new BadRequestException()
    return findByIdAndUpdate;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException()
    const findByIdAndDelete = await this.productsModel.findByIdAndDelete(id)
    if (findByIdAndDelete) throw new BadRequestException()
    return findByIdAndDelete;
  }
}
