//Query to creat database
export const dbCreationQuery = `CREATE SCHEMA IF NOT EXISTS shopnow;`;

//query to create authtable
export const authTableCreationQuery = `CREATE TABLE IF NOT EXISTS shopnow.authtable (
    id VARCHAR(36) NOT NULL DEFAULT (UUID()),
    email VARCHAR(45) NOT NULL,
    password VARCHAR(512) NOT NULL,
    refreshtoken VARCHAR(512) NULL,
    role ENUM("admin", "manager", "user") NOT NULL DEFAULT 'user',
    createdat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE INDEX IDX_EMAIL_UNIQUE (email ASC)
);`;


export const productTableCreationQuery=`CREATE TABLE IF NOT EXISTS shopnow.products (
  id VARCHAR(36) NOT NULL DEFAULT (UUID()),
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
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
);
`