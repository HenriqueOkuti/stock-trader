CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMP NOT NULL,
	"isValid" bool NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "stocks" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"stockTag" TEXT NOT NULL UNIQUE,
	CONSTRAINT "stocks_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "stockInfo" (
	"id" serial NOT NULL,
	"stockId" int NOT NULL,
	"price" money NOT NULL,
	"lastUpdate" TIMESTAMP NOT NULL,
	CONSTRAINT "stockInfo_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userStocks" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"stockId" int NOT NULL,
	"boughtAt" money NOT NULL,
	"boughtWhen" TIMESTAMP NOT NULL,
	CONSTRAINT "userStocks_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "userBalance" (
	"id" serial NOT NULL,
	"userId" int NOT NULL UNIQUE,
	"balance" money NOT NULL,
	CONSTRAINT "userBalance_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "stockInfo" ADD CONSTRAINT "stockInfo_fk0" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "userStocks" ADD CONSTRAINT "userStocks_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "userStocks" ADD CONSTRAINT "userStocks_fk1" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "userBalance" ADD CONSTRAINT "userBalance_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id")  ON DELETE CASCADE ON UPDATE CASCADE;





