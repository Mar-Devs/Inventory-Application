const { get } = require("../controller/indexRouter.js");
const pool = require("./pool.js");
const format = require("pg-format");

async function getData(tableName) {
  const data = format("SELECT * FROM %I", tableName);
  const { rows } = await pool.query(data);
  const arr = [];
  rows.map((m) => {
    let id = m["id"];
    let weaponName = m[`${tableName}-type`];
    let quantity = m["quantity"];
    let temp = [id, weaponName, quantity];
    arr.push(temp);
  });
  console.log(`HIII ${arr}`);
  return arr;
}

async function createTable(tableName) {
  const columnName = `${tableName}-type`;
  const create = format(
    "CREATE TABLE IF NOT EXISTS %I (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, %I TEXT, quantity INTEGER) ",
    tableName,
    columnName,
  );

  await pool.query(create);
}

async function insertData(tableName, data, quantity) {
  const colName = `${tableName}-type`;
  const insert = format(
    "INSERT INTO %I (%I , quantity) VALUES ($1 , $2)",
    tableName,
    colName,
  );

  await pool.query(insert, [data, quantity]);
}

async function removal(tableName) {
  const data = format("DROP TABLE %I", tableName);
  await pool.query(data);
}

async function oneTimeQueries() {
  await pool.query('DELETE FROM "first-aid" WHERE id BETWEEN 4 AND 12');
}

oneTimeQueries();
async function getCategories() {
  const { rows } = await pool.query("SELECT category FROM categories");
  console.log(rows);
  return rows;
}

async function alterItems(tableName, newQuantity, id) {
  const data = format(
    "UPDATE %I SET quantity = ($1) WHERE id = ($2)",
    tableName,
  );
  await pool.query(data, [newQuantity, id]);
}



async function deleteItem(tableName, id) {
  const data = format("DELETE FROM %I WHERE id = ($1)", tableName);

  await pool.query(data, [id]);
}

module.exports = {
  getData,
  createTable,
  insertData,
  getCategories,
  alterItems,
  deleteItem,
};
