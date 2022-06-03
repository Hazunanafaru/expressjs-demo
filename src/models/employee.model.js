'use strict';

var dbConnection = require('../../config/db.config');

//Create object/schema(?) employee
var Employee = function(employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status;
    this.created_at = new Date();
    this.updated_at = new Date();
};

// Create Employee
Employee.create = function(newEmployee, result) {
    // query for create
    const createQuery = "INSERT INTO employees SET ?"
    
    // Do the query
    dbConnection.query(createQuery, newEmployee, function(err, res) {
        // If error, show it
        if(err) {
            console.log("error", err);
            result(err, null);
        }
        
        // If not, show the insertId
        console.log(res.insertId);
        result(null, res.insertId);
    });
};

// Get Employee by Id
Employee.getById = function(id, result) {
    // query for get
    const getQuery = "SELECT * FROM employees WHERE id = ? "

    // Do the query
    dbConnection.query(getQuery, id, function(err, res) {
        // If error, show it
        if(err) {
            console.log("error", err);
            result(err, null);
        }

        // If not, serve the employee data
        console.log("employee", res);
        result(null, res);
    });
};

// Get All Employee
Employee.getAll = function(result) {
    // query for get all
    const getAllQuery = "SELECT * FROM employees"

    // Do the query
    dbConnection.query(getAllQuery, function(err, res) {
        // If error, show it
        if (err) {
            console.log("error", err);
            result(err, null);
        }

        // If not, serve the employee data
        console.log("employees", res)
        result(null, res);
    });
};

// Update Employee
Employee.update = function(id, employee, result) {
    // query for update
    const updateQuery = `
    UPDATE employees SET
        first_name=?,
        last_name=?,
        email=?,
        phone=?,
        organization=?,
        designation=?,
        salary=?
    WHERE id = ?
    `

    // Employee data to be updated
    const employeeData = [
        employee.first_name,
        employee.last_name,
        employee.email,
        employee.phone,
        employee.organization,
        employee.designation,
        employee.salary,
        id
    ]

    // Do the query
    dbConnection.query(updateQuery, employeeData, function (err, res) {
        // If error, show it
        if (err) {
            console.log("error", err);
            result(err, null);
        }

        // If not, update employee data
        console.log("res", res)
        result(null, res);
    });
};

// Delete Employee
Employee.delete = function(id, result) {
    // query for delete
    const deleteQuery = "DELETE FROM employees WHERE id = ?"

    // Do the query
    dbConnection.query(deleteQuery, id, function (err, res) {
        // If error, show it
        if (err) {
            console.log("error", err);
            result(err, null);
        }

        // If not, show deleted employee
        console.log("res", id)
        result(null, res);
    });
};

module.exports = Employee;