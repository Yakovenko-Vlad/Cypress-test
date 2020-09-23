# Project Title

Cypress based test automation project.

### Prerequisites

What things you need to prepared for development and test running

Start your test app on local. In case you use cloud hosted app or Docker cotntainer - set your app IP in `cypress.json` file in `baseUrl` property.

Run comand
```
npm install
```

## Running the tests

First step is to run cypress.

```
npx cypress open
```


After opening Cypress web page in browser click 'Run all specs' for running all existing automation tests or click on any specific spec from the list for runnign only one tests automation suite.


### Reporting

The most common way to see results of the execution on local is to use Cypress web app where you select which specs you want to execute.

In order have better visibility of the execution you can switch to any step in any automation test to see your web app state exectly in that time of the execution. 


### Dockerising

To build image use
```
docker build -t cypress-img .
```

And then run the image with command

```
docker run --name cypress-container -it -v "$(pwd)/test-report/result:/home/node/app/cypress/result" --rm cypress-img:latest  
```

After the tests execution the docker container will be removed and the report will be saved in `./test-report/result` folder. For reviewing test execution report open `./test-report/result/report.html`
