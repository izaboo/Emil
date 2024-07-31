# UI test for DemoCentral
## This repository contains simple automation test framework written with TypeScript and Playwright. 

To run UI test locally:

- Clone this repository
- Make sure you have node.js installed. If you don't, please visit official website for instructions
- Run npm install to install node modules
Tests can be run with **npm run test** command.

Architecture approach: page-object model is used.

2 pages are described in separate classes:

- base page aka first page and menu
- board page with elements of filters and download menu

Csv file downloads to folder **data** (will be created automatically).

Repository also contains workspace of Postman tests approach for testing API of math.js

## Postman test approach for math.js
Test analysis was based on https://api.mathjs.org/. Data-driven approach suits the best for this case.
- functional positive tests
  - GET
  - POST
- negative tests (check e.g. url encoding, parameters absence etc)

Positive tests need to be build so cover functional spec (https://mathnotepad.com/docs/functions.html), expressions building, chaining as well as numbers intervals, big numbers etc. Common cases were add as files with input data and expected result:

- csv for GET
- json for POST
