import express from 'express';

import {
    getemployees,
    addemployee,
    getemployee,
    updateemployee,
    deleteemployee,
    login
    
} from '../controllers/employee_con.js';

const router = express.Router();

router.get('/getemployee', getemployees);
router.post('/addemployee', addemployee);
router.get('/:id', getemployee);
router.patch('/:id', updateemployee);
router.delete('/:id', deleteemployee);

//router.get('/group/:id', getemployeesFromGroup);



export default router;
