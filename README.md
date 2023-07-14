# CS-Solo-Proj

[x] 1. set up webpack

    [x] create new node project
        npm init -y
    [x] install webpack
    [x] install babel
        npm install -D babel-loader @babel/core @babel/preset-env webpack
    [x] install scss
        npm i --save-dev sass-loader css-loader style-loader
    [x] install dev server
         npm install --save-dev webpack-dev-server

[] 2. create a log in (index.html) OAuth!!!

    [x] log in database
    [] sign in sign out

    dev": "NODE_ENV=development webpack serve --open & nodemon src/server/server.js",

[] 3. create session/secret page pair
[] 4. fetch google maps api and render that on session (React)
[] 5. do some frontend. implement render on this map
[] 6. have the ability to see "friends" and see their pins

Database:

polyglot Persistence:

[] we will use object relational mapping users and cards.

Bonus:
[] we will use postgressql for maintaining friendships
