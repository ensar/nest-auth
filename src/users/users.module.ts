import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../db/schemas/user.schema';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function () {
            this.password = await bcrypt.hashSync(this.password, 10);
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
