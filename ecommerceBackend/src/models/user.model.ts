//Query to creat database
export const dbCreationQuery = `CREATE SCHEMA IF NOT EXISTS shopnow;`;

//query to create authtable
export const authTableCreationQuery = `CREATE TABLE IF NOT EXISTS shopnow.authtable (
  _id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  refreshtoken VARCHAR(255) NULL,
  role ENUM("admin", "manager", "user") NOT NULL DEFAULT 'user',
  timestamp TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  updatedat DATETIME NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (_id, email),
  UNIQUE INDEX _id_UNIQUE (_id ASC) VISIBLE,
  UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE
)`;