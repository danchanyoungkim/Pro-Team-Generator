const Employee = require("./Employee");

class Manager extends Employee {

  constructor(name, id, email, officeNumber) {
    // YOUR CODE HERE
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    // YOUR CODE HERE
    return "Manager";
  }

  getOfficeNumber() {
    // YOUR CODE HERE
    return this.officeNumber;
  }

}

module.exports = Manager;
