import mongoose from 'mongoose';

const employee_AccountSchema = mongoose.Schema({
   
    employee_id: {
        type: String,
        required: true,
        unique: true
    },
    employee_name: {
        type: String,
        required: true
    },
    employee_designation: {
        type: String,
        required: true
    },
    employee_type: {
        type: String,
        required: true
    },
    experince: {
        type: String,
        required: true
    }   

})

const employeeAcc = mongoose.model('employees', employee_AccountSchema);

export default employeeAcc;
