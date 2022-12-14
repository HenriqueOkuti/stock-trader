select * from users u;
select * from sessions se;
select * from "userStocks" us ;
select * from stocks st ;
select * from "stockInfo" si ;
select * from "userBalance" ub;

alter table "stockInfo" drop column name;

--Create new stock (requires: stockName and stockTag)
insert into stocks (name, "stockTag") values ($1, $2);

--Create new stockInfo (requires: stockId and latestPrice)
insert into "stockInfo" ("stockId", price, "lastUpdate") values ($1, $2, now());

--Create new user (requires: userName, userEmail, userPassword)
insert into users (name, "email", "password") values ($1, $2, $3);

--Finds latest stock info based on stockId (use case: fetch latest stock price)
select * from stocks s
join "stockInfo" si on si."stockId" = s.id 
where s.id = $1
order by si."lastUpdate" desc limit 1;

--Create new session (use case: user logs in, input user token)
insert into sessions ("userId", token, "createdAt", "isValid") values ($1, $2, now(), true);

--Finds sessions from user (use case: verify if session is valid)
select * from sessions s
where "userId" = $1
order by "createdAt" desc;

--Finds all valid sessions (use case: if session is older than 10min switch isValid from true to false)
select * from sessions s
where "isValid" = true;

--Creates userBalance for a newUser (use case: every user should have a balance)
insert into "userBalance" ("userId", balance) values ($1, $2);

--Updates userBalance via userId (use case: every time the user updates their balance)
update "userBalance" 
set balance = $2
where "userId" = $1;

-- Returns table with:
-- 	rowId (id), 
-- 	userId, 
-- 	value if transaction occurs (newBalance), 
-- 	if the transaction is Valid (isValidTransaction)
select id, "userId" , (balance - $2) as "newBalance",
	case
		when (balance - $2 >= '0') then true
		else false
	end
	as "isValidTransaction"
from "userBalance" ub
where "userId" = $1
;

-- gets "stockInfo" based on the lastUpdate
select s.id, s."name" , s."stockTag", si.price, si."lastUpdate" 
from "stockInfo" si 
join 
	(
	select si."stockId" , MAX(si."lastUpdate") as "latestUpdate" from "stockInfo" si group by si."stockId"
	) as aux on aux."stockId" = si."stockId" 
join stocks s on s.id = si."stockId"
where aux."latestUpdate" = si."lastUpdate";
;