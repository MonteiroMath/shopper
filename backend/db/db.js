const mysql = require("mysql2/promise");

async function executeQuery(query) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
  });

  const [results, fields] = await connection.execute(query);

  connection.close();
  
  return results;
}

module.exports = { executeQuery };
