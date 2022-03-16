const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

// Inform user of usage
console.log(
  '\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

function appMenu() {
  // Create manager first, then the manager will create a team
  // Once manager is created, we will create team by asking the user which type of employee to create
  // Based on the choice, we will create that employee object
  // Loop thru the create team function until user is done from creating employees for the team
  // then we will use the employee objects created to render html for the team

  function createManager() {
    console.log('Please build your team 👥');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: "What is the team manager's id?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "What is the team manager's email?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "What is the team manager's office number?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        }
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        // Pushes manager variable into team array.
        teamMembers.push(manager);
        // Pushes manager id into id array.
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'Which type of team member would you like to add?',
          choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Engineer':
            addEngineer();
            break;
          case 'Intern':
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    console.log('Please enter engineer information')
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: "What is the engineer's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character!'
          }
        },
        {
          type: 'input',
          name: 'engineerId',
          message: "What is the engineer's id?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character!'
          }
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: "What is the engineer's e-mail?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character!'
          }
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: "What is the engineer's Github?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character!'
          }
        }
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        // Pushes engineer variable into team array.
        teamMembers.push(engineer);
        // Pushes engineer id into id array.
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
      {
        type: 'input',
        name: 'internName',
        message: "What is the intern's name?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter at least one character'
        }
      },
      {
        type: 'input',
        name: 'internId',
        message: "What is the intern's id?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter at least one character'
        }
      },
      {
        type: 'input',
        name: 'internEmail',
        message: "What is the intern's e-mail?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter at least one character'
        }
      },
      {
        type: 'input',
        name: 'internSchool',
        message: "What is the intern's school?",
        validate: (answer) => {
          if (answer !== '') {
            return true;
          }
          return 'Please enter at least one character'
        }
      },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        // Pushes intern variable into team array.
        teamMembers.push(intern);
        // Pushes intern id into id array.
        idArray.push(answers.internId);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}

appMenu();