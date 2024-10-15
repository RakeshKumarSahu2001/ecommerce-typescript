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


export const productTableCreationQuery=`CREATE TABLE IF NOT EXISTS shopnow.products (
  _id VARCHAR(36) NOT NULL DEFAULT (UUID()),
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) NOT NULL,
  images JSON NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(5,2) NOT NULL,
  stock INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (_id),
  UNIQUE INDEX _id_UNIQUE (_id ASC) VISIBLE
);
`