
# Stock Trader

Stock Trader is a proof of concept for an api of an hypotethical stock trading website where the end user is able to register and review stock transactions.


## Key Features

- F1
- F2
- F3
- F4



## How to use

> To be added

To run this project, you will need to add the following environment variables to your .env file

`PORT`: Your db port

`DATABASE_URL`: Your Postgres connection string 

Refer to `.env.example` for further info.

```
Code should appear here someday
```

### Routes

The routes are separated by what kind of functionality can (mostly) be inferred by their name.

#### **authUserRouter**

- POST: `/signin`
- POST: `/login`

> IMPORTANT: Unless specified, all routes bellow use the token recieved on the `login`

#### **modifyStocksRouter**

- POST: `/stock`
- PUT: `/stock`
- GET: `/stock`
- DELETE: `/stock`

#### **userBalanceRouter**

- POST: `/balance`
- PUT: `/balance`
- GET: `/balance`

#### **userTransactionRouter**

- POST: `/transaction`
- GET: `/transaction`

#### **latestStocksRouter**

- GET: `/latest`

#### **nonExistentRouter**

- GET: Any other adress 

## FAQ

#### Question 1

> To be added

#### Question 2

> To be added

