# Interview Scheduler

This single page application lets users schedule, edit, or delete interviews. The application makes requests to a server to store the interviews. It supports multiple concurrent users through the use of web sockets.

## Hosted Example

You can run this app on the following netlify link: https://react-interview-scheduler.netlify.com/

## Setup

Install dependencies with `npm install`.

Install the API server from https://github.com/lighthouse-labs/scheduler-api. Our Interview Scheduler will make calls to save or edit from this test server.

Copy the `env.example` file to `env.development`. The websocket URL will need to be changed if a different backend server is used. The file must be copied to `env.test` to properly run the Cypress test suite.

## Running Webpack Development Server

```sh
npm start
```

The app will be servered on http://localhost:8000/ by default.

## Running Jest Test Framework

```sh
npm test
```

To see the test coverage report, run the below command

```sh
npm test -- --coverage --watchAll=false
```

the report will be in `coverage > lcov-report > index.html`

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Framework

```sh
npm run cypress
```

# Technical Specifications

- React
- Webpack, Babel
- Axios
- WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Dependencies

- axios: 0.19.1 and above
- classnames: 2.2.6 and above
- react: 16.9.0 and above
- react-dom: 16.9.0 and above
- react-scripts: 3.0.0

# Images

![Add interview](https://raw.githubusercontent.com/fgfl/scheduler/master/documents/add/add_interview.gif)

Adding an interview.

![Deleting interview](https://raw.githubusercontent.com/fgfl/scheduler/master/documents/delete/delete_animation.gif)

Deleting an interview.
