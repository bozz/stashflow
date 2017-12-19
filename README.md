# stashflow

Simple personal finance app for viewing, filtering, and visualizing transactions.

The server and client of the application are completely seperated and run on different ports.

For the server:

```
cd server/
npm install
npm run db:init
npm run db:seed
npm run dev
```

For the client:

```
cd client/
npm install
npm run dev
```

The client should then be running on localhost:8080
