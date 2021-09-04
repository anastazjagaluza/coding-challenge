<h1 align="center">Pokemon Coding Challenge</h1>
<br/>

* A simple React app fetching and dipslaying data about different pokemon
* User can search for pokemon by name or ability
* User can choose how many pokemon should be displayed (whether it's 10, 20 or 50)
* User can sort displayed pokemon by name, height and weight
* Provided with basic integration tests written in cypress
* App is coded in TypeScript

<img width="10%" height="10%" align="center" src="https://www.kindpng.com/picc/m/0-9439_charmander-github-vicky002charmander-a-bot-for-slack-pokemon.png">

## ➤ Table of Contents
* [➤ 0. Installation](#-0-installation)
* [➤ 1. Get it running](#-1-get-it-running)
* [➤ 2. Running the tests](#-2-running-the-tests)
* [➤ License](#-license)

## ➤ 0. Installation
Clone the repository and run ```npm install``` from the root folder.

## ➤ 1. Get it running

After you have installed everything, run ```npm start``` command in the terminal and wait for a few seconds. If the page doesn't open automatically, try going to <a href="http://localhost:3000" target="_blank" >http://localhost:3000</a> to open the page.

## ➤ 2. Running the tests
The test are in the /cypress folder in the root of the project. You can run them in two ways - either headlessly, in the CLI or in a cypress UI. In both cases, you first need to run the application in a separate CLI.

For the headless testing, write ```npm test``` in a separate terminal after you have run the development mode. 
For the testing UI, write ```npm run cypress:open``` in a separate terminal after you run the development mode, and wait for a few seconds for the UI to open. After that you can click the only available test on the list.

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
