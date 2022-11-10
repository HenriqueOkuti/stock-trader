import { newStock } from '../protocols/index.js';
import db from '../config/database.js';

export function getStocks() {
  return db.query(`
    select 
        st.name, 
        st."stockTag", 
        st.id as "stockId", 
        si.price, 
        si."lastUpdate"  
    from stocks st
    join "stockInfo" si on st.id = si."stockId"
    ;`);
}

export function getSpecificStock(stockId: number) {
  return db.query(
    `
      select 
          st.name, 
          st."stockTag", 
          st.id as "stockId", 
          si.price, 
          si."lastUpdate"  
      from stocks st
      join "stockInfo" si on st.id = si."stockId"
      where st.id = $1
      ;`,
    [stockId]
  );
}

export function findStockByName(stockName: string) {
  return db.query(`select * from stocks where name = $1;`, [stockName]);
}

export function createNewStock(stock: newStock) {
  return db.query(
    `
    with ins1 as (
	    insert into stocks (name, "stockTag") values ($1, $2)
	    returning id as stock_id
	    )
    insert into "stockInfo" ("stockId", price, "lastUpdate") values ((select stock_id from ins1), $3, now())
    ;`,
    [stock.stockName, stock.stockTag, stock.price]
  );
}
