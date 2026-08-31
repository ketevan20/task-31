import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email })
    if (existingUser) throw new BadRequestException()
    const newUser = await this.userModel.create(createUserDto)
    return newUser;
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException()
    const user = await this.userModel.findById(id)
    if (!user) throw new BadRequestException()
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new BadRequestException()
    const updatedUserById = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    if (!updatedUserById) throw new BadRequestException()
    return updatedUserById;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException()
    const removedUserById = await this.userModel.findByIdAndDelete(id)
    if(!removedUserById) throw new BadRequestException()
    return removedUserById;
  }
}
