#Lab08 Task

###Commit Legend:

-   init: 👽 _init message_
-   change: 👨‍💻 _change message_
-   fix: 💩 _bug fix message_

###Setup

####1. Install dependencies

In terminal run command `npm i`.

####2. Create `.env` file

`.env.example` is already provided with the necessary variables so command `cp .env.example .env`. And then add these variables:

```
PUBLIC_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000
```

####3. Start JSON-server
In terminal run command `npx json-server --watch ./src/api/data.json --port 5000`

####4. Start Project
In terminal run command `npm start`

####5. Enjoy 🙂
