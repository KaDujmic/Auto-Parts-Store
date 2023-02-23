<a name="readme-top"></a>

<h1 align="center">Auto Parts Store Assignment</h1>

  <h3>Table of Contents</h3>
  <ol>
    <li>
      <a href="#about-the-app">About The App</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-description">API Description</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>

## About The App

The Auto Parts Store is a group project assigned during the Agilathon 2023 dev internship. <br>
It features an auto parts store system where a customer can order different vehicle parts.

Notable features:
<ul>
  <li>REST API</li>
  <li>PostgreSQL database</li>
  <li>Cron job scheduling for repeating functions (e.g. notifications, currency rate updates)
  <li>Email notifications for both the customers, and employee</li>
  <li>Caching of commonly used data</li>
  <li>Ability for customers to place multiple item orders</li>
  <li>Ability for items to be ordered to the shop, in the event that our stock of those items ran out</li>
  <li>Daily updates to our supported currencies and their rates, via a call to a third party API</li>
  <li>Authorization based on two roles, customer and sales person</li>
</ul>

### Built With:

* [![nodejs.shield]][nodejs.url]
* [![express.shield]][express.url]
* [![postgres.shield]][postgres.url]
* [![sequelize.shield]][sequelize.url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)
* Node Package Manager
  ```
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```
   git clone https://github.com/agilathon/auto_parts_store.git
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. Rename and modify the .env.example file in the working directory, to suit your needs

4. Run the following command to setup the database containers and volumes:
   ```
   docker compose up
   ```

5. Run the following commands to migrate and seed the database:
   ```
    npm run migrate:{env}
    npm run seed:{env}
   ```
6. Run the following command to start the server:
   ```
    npm run start:{env}
   ```
       
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## API Description
There are two ways to review the API and its possibilities:
* <a href="#swagger-ui">Swagger UI</a>
* <a href="#postman-collection">Postman Collection</a>

Note that requests require authentication. Use the login route to authenticate as either a customer, or sales person. <br> 
Login info is included in the API examples.

### Swagger UI
After starting the server (see -> <a href="#installation">Installation</a>), you simply need to navigate to the following URL:
   ```
    http://localhost:{port}/api-docs
   ```

### Postman Collection
A postman collection is included in the working directory. It contains a list of all possible requests that can be run as a whole.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

#EDIT TESTING SECTION TO FIT CURRENT UNIT/INTEGRATION TESTS
Jest is used for testing.<br>
Use the following command to do a full test run:
   ```
    npm run test
   ```

After tests are ran, the CLI report can be used to review test coverage. HTML generated reports can be found for test results/coverage as well. <br>
Test report will be in the main working directory, and the coverage ones under coverage/lcov-report.

If sequelize logs are obstructing the command line review, you can go to db/config/config.js, and add the following property to the environment being used:
```
logging: false
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributors
<ul>
    <li>Internship team members:</li>
      <ul>
        <li><a href="https://github.com/KaDujmic">Dujmic Karlo</a></li>
        <li><a href="https://github.com/igaspa">Gasparov Ivana</a></li>
        <li><a href="https://github.com/Goran501">Stajduhar Goran</a></li>
      </ul>
    <li>Internship team mentors:</li>
      <ul>
        <li><a href="https://github.com/antebircic">Bircic Ante</a></li>
        <li><a href="https://github.com/tkutlesa">Kutlesa Toni</a></li>
      </ul>
    </li>
</ul>

Third Party API used for retrieving currency rates: <a href="https://exchangerate.host">Exchange Rate</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[nodejs.shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[nodejs.url]: https://nodejs.org/en/
[express.shield]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express.url]: https://expressjs.com
[postgres.shield]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[postgres.url]: https://www.postgresql.org/
[sequelize.shield]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[sequelize.url]: https://sequelize.org/
