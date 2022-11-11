import { db } from '../config/index.js';
export function getStocks() {
    return db.query("\n    select \n        st.name, \n        st.\"stockTag\", \n        st.id as \"stockId\", \n        si.price, \n        si.\"lastUpdate\"  \n    from stocks st\n    join \"stockInfo\" si on st.id = si.\"stockId\"\n    ;");
}
export function getSpecificStock(stockId) {
    return db.query("\n      select \n          st.name, \n          st.\"stockTag\", \n          st.id as \"stockId\", \n          si.price, \n          si.\"lastUpdate\"  \n      from stocks st\n      join \"stockInfo\" si on st.id = si.\"stockId\"\n      where st.id = $1\n      ;", [stockId]);
}
export function findStockByName(stockName) {
    return db.query("select * from stocks where name = $1;", [stockName]);
}
export function createNewStock(stock) {
    return db.query("\n    with ins1 as (\n\t    insert into stocks (name, \"stockTag\") values ($1, $2)\n\t    returning id as stock_id\n\t    )\n    insert into \"stockInfo\" (\"stockId\", price, \"lastUpdate\") values ((select stock_id from ins1), $3, now())\n    ;", [stock.stockName, stock.stockTag, stock.price]);
}
export function findStockById(id) {
    return db.query("select * from stocks where id = $1;", [id]);
}
export function editStockById(editedStock) {
    return db.query("\n    update stocks \n\t  set \n  \t\t\"name\" = $1,\n\t  \t\"stockTag\" = $2\n\t  where \n\t\t  id = $3\n    ;", [editedStock.stockName, editedStock.stockTag, editedStock.id]);
}
export function deleteStockById(id) {
    return db.query("delete from stocks where id = $1;", [id]);
}
