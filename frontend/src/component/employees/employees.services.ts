import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { EmployeeDto } from '../shared/dto/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(employeeDto: EmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(employeeDto);
    return createdEmployee.save();
  }

  async update(id: string, employeeDto: EmployeeDto): Promise<Employee> {
    return this.employeeModel.findByIdAndUpdate(id, employeeDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndRemove(id);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }
}
