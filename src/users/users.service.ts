import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/auth';
import { User, UserDocument } from '../db/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(body): Promise<Required<IUser>> {
    const user = new this.userModel(body);
    return user.save();
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }
}
