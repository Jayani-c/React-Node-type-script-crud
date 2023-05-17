import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from '../shared/dto/employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() employeeDto: EmployeeDto): Promise<Employee> {
    return this.employeesService.create(employeeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() employeeDto: EmployeeDto): Promise<Employee> {
    return this.employeesService.update(id, employeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.delete(id);
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }
}
