# Stock Trader

Stock Trader is a proof of concept for an api of an hypotethical stock trading website where the end user is able to register and review stock transactions.

## Key Features

- F1
- F2
- F3
- F4

## How to use

Clone the repository and install dependencies.

To run this project, you will need to add the following environment variables to your .env file

`PORT`: Your db port

`DATABASE_URL`: Your Postgres connection string

Refer to `.env.example` for further info.

Use the database dump located on `/dump` to serve as the database. Some data is already included.

```bash
psql -U username -d database < dump.sql
```

Now all you need to run the typescript version is:

```bash
npm run start-ts
```

In case you want to run the javascript version:

```bash
npm run start-js
```

### Routes

The routes are separated by what kind of functionality can (mostly) be inferred by their name.

#### **authUserRouter**

- POST: `/signin`

For the request to work you must send a body with the following format:

```json
{ "name": "Username", "email": "email@mail.com", "password": "password" }
```

User duplication is verified via the "email" field, which must be unique. All fields are strings.

<br />

- POST: `/login`

Here you should send a body with the following format:

```json
{ "email": "email@mail.com", "password": "password" }
```

Should your request info be correct you'll recieve as response:

```json
{ "token": "token-string" }
```

<br />

> IMPORTANT: Unless specified, the recieved token will be used on all routes bellow

<br />

For the routes bellow you'll need to pass the token on the header with the format:

```javascript
{headers: {Authorization: 'Bearer token'}
```

<br />

#### **modifyStocksRouter**

- POST: `/stock`

On the body of the request you'll need:

```json
{ "stockName": "name", "stockTag": "tag", "price": "price" }
```

Where both "stockName" and "stockTag" are strings, while "price" can either be of type number or string. Additional requirements: both "stockName" and "stockTag" must be unique, with "stockTag" having length 3.

Quick suggestion while using: Pick the first two letters of stockName + a number for stockTag, for example: "STOCK" should result in "ST1" for the tag.

<br />

- PUT: `/stock`

On the body of the request you'll need:

```json
{ "id": "stockId", "stockName": "New stock name", "stockTag": "New stock tag" }
```

Besides the requirements of the POST route, you'll need the "id" of the stock you want to change, which can either be a string or a number.

There are no restrictions for the id, for the sake of simplicity any user can edit any stock name and tag, as long as they remain unique inside the database.

Caution: You'll recieve a bad request if you try to change the stock info to the info it already has saved, i.e. you are not allowed to change a name+tag for the same combo of name+tag.

<br />

- GET: `/stock`

For this route to work you only need to pass the token on the header.

However, there's another functionality: you can pass the specific stockIds you want to recieve via query string with the following format:

```/stock?stockId=1``` or ```/stock?stockId=1,2,3```

Where each number is the stockId you want to recieve. Should there by none found (i.e. stockId only goes up to 5 on the db and you pass stockId=6) you'll recieve the full list of stocks. Do note that non numerical values on the query string should also result on the full list of stocks.

<br />

- DELETE: `/stock`

Here you need to pass the stockId of the stock you want to delete on the body of the request, with the format:

```json
{ "id": "stockId" }
```

Where "stockId" can either be a string or a number. But do remember, ids are integers.

For the sake of simplicity, just like a user can edit any stock info, they can also delete any stock. Also, only one delete can be made at a time.

<br />

#### **userBalanceRouter**

- POST: `/balance`

Here you'll need a body with the format:

```json
{"balance": "value"}
```

Where "value" can either be a string of a number. As with all the monetary values, "value" used a "toFixed(2)". Sorry, not sorry, if the money you used as the input gets rounded down.

<br />

- PUT: `/balance`

Similarly to the POST route, all you need is a body with the format:

```json
{ "balance": "1000.001" }
```

<br />

- GET: `/balance`

Nothing is needed to fetch the user balance besides the token.

<br />

#### **userTransactionRouter**

- GET: `/transaction`

No body is required, the response is an array with all the stocks the user bought. However, you can get specific results by using a query string:

```/transaction?stockId=1``` or ```/transaction?stockId=1,2,3```

Works pretty much the same way as the `/stock` route.

<br/>

- POST: `/transaction`

Here you'll need to send the following body:

```json
{ "stockId": "stockId" }
```

Where "stockid" is the id of the stock the user wants to buy. Should the user have enough balance to buy it, it'll succeed. It can either be a string or a number, as long as the numerical value exists on the database.

<br />

#### **latestStocksRouter**

- GET: `/latest`

Nothing is required besides the token. You'll get an array with the latest stocks and their last price update. You can use query string to filter array via "stockId"

```/latest?stockId=1``` or ```/latest?stockId=1,2,3```

<br />

#### **nonExistentRouter**

- GET: Any other adress

Finally, no other route uses the token. Of course, that's because there are no other routes, you should get a 404 status code for any other adress. But then again, what's stoping you from using the token anyway?

<br />

## FAQ

#### Are there any features that'll be implemented in the future?

> Maybe. I enjoyed working on the features of this project and during it i thought to myself: "I could gamify this" with features like a stock price randomizer (or a web scraper), investors ranking, artificial investors with their own "buy / sell" rules and so on. This is not a promise however.

#### I've found a bug on X feature, can you fix it?

> Open a "Issue" and we'll see. Feel free to adjust the code though.

#### Were those really FAQs?

> Nope. I just indulged on a healthy dose of narcisism :)
