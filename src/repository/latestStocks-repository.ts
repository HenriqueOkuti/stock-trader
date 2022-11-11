import { db } from '../config/index.js';

export function getLatestStockPrices(stockIds: number[] = []) {
  const hasIds: boolean = stockIds[0] ? true : false;
  return db.query(
    `
    select s.id, s."name" , s."stockTag", si.price, si."lastUpdate" 
    from "stockInfo" si 
    join 
    	(
    	select si."stockId" , MAX(si."lastUpdate") as "latestUpdate" from "stockInfo" si group by si."stockId"
    	) as aux on aux."stockId" = si."stockId" 
    join stocks s on s.id = si."stockId"
    where case when $2 then (aux."latestUpdate" = si."lastUpdate" and si."stockId" = ANY($1)) else (aux."latestUpdate" = si."lastUpdate") end;    
  `,
    [stockIds, hasIds]
  );
}
