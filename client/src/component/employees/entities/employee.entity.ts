import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  name: string;

  @Prop()
  employeeId: string;

  @Prop()
  designation: string;

  @Prop()
  employeeType: string;

  @Prop()
  experience: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
