// src/components/EmployeeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSort = () => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (a.name < b.name) return sortAsc ? -1 : 1;
      if (a.name > b.name) return sortAsc ? 1 : -1;
      return 0;
    });
    setEmployees(sortedEmployees);
    setSortAsc(!sortAsc);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const employeesPerPage = 5;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const renderEmployees = currentEmployees.map((employee) => (
    <tr key={employee.id}>
      <td>{employee.name}</td>
      <td>{employee.employeeId}</td>
      <td>{employee.designation}</td>
      <td>{employee.employeeType}</td>
      <td>{employee.experience}</td>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={handleSort}>Name</th>
            <th>Employee ID</th>
            <th>Designation</th>
            <th>Employee Type</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>{renderEmployees}</tbody>
      </table>
      {loading ? <div>Loading...</div> : null}
      <Pagination
        itemsPerPage={employeesPerPage}
        totalItems={employees.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeeList;
