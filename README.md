# MyReads Project

This is a Book Tracking App, in which you can categorize your bookshelf in read, currently reading, or want to read. You can move your books from one shelf to another. You can also seach for a book and add it to any of the above bookshelfs.

## Requirements

* Node 8.16.0 or Node 10.16.0 or later (https://nodejs.org/en/)
* Git


## TL;DR

To get started developing right away:

* Download the zip file or clone the repository 
* Navigate to the repository 
* Open Terminal Window 
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Screens 



## Backend Server

The provided file [api.js`](src/utils/api.js) contains the methods to perform necessary operations on the backend:

* [`getInitialData`](#getallquestionsandusers)
* [`saveQuestion`](#savequestion)
* [`saveQuestionAnswer`](#savequestionanswer)

### `getInitialData`

Method Signature:

```js
getInitialData()
```

* Returns a Promise which resolves to a JSON object containing a collection of questions and users objects.
* This collection represents the unanswered and answered questions of the signed in user in your app.

### `update`

Method Signature:

```js
saveQuestion(optionOne, optionTwo, author)
```

* optionOne: `<String>` contains the option two input field
* optionTwo: `<String>` contains the option two input field  
* author: `<String>` contains signed in user id  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
saveQuestionAnswer(authedUser, qid, answer)
```

* authedUser: `<String>` contains signed in user id
* qid: `<String>` conatins the question id for the answer  
* answer: `<String>` contains the answer value 
* Returns a Promise which resolves to a JSON object containing the response data of the POST request


## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

Create React App is open source software licensed as MIT.
