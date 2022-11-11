import { db } from '../config/index.js';
export function getLatestStockPrices(stockIds) {
    if (stockIds === void 0) { stockIds = []; }
    var hasIds = stockIds[0] ? true : false;
    return db.query("\n    select s.id, s.\"name\" , s.\"stockTag\", si.price, si.\"lastUpdate\" \n    from \"stockInfo\" si \n    join \n    \t(\n    \tselect si.\"stockId\" , MAX(si.\"lastUpdate\") as \"latestUpdate\" from \"stockInfo\" si group by si.\"stockId\"\n    \t) as aux on aux.\"stockId\" = si.\"stockId\" \n    join stocks s on s.id = si.\"stockId\"\n    where case when $2 then (aux.\"latestUpdate\" = si.\"lastUpdate\" and si.\"stockId\" = ANY($1)) else (aux.\"latestUpdate\" = si.\"lastUpdate\") end;    \n  ", [stockIds, hasIds]);
}
