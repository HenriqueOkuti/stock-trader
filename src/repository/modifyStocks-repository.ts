import { editStockType, newStockType } from '../protocols/index.js';
import { db } from '../config/index.js';

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

export function createNewStock(stock: newStockType) {
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

export function findStockById(id: number) {
  return db.query(`select * from stocks where id = $1;`, [id]);
}

export function editStockById(editedStock: editStockType) {
  return db.query(
    `
    update stocks 
	  set 
  		"name" = $1,
	  	"stockTag" = $2
	  where 
		  id = $3
    ;`,
    [editedStock.stockName, editedStock.stockTag, editedStock.id]
  );
}

export function deleteStockById(id: number) {
  return db.query(`delete from stocks where id = $1;`, [id]);
}
