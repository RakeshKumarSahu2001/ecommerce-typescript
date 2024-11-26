//Query to creat database
export const dbCreationQuery = `CREATE SCHEMA IF NOT EXISTS shopnow;`;

//query to create authtable
export const authTableCreationQuery = `CREATE TABLE IF NOT EXISTS shopnow.authtable (
    ID VARCHAR(36) NOT NULL DEFAULT (UUID()),
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(512) NOT NULL,
    RefreshToken VARCHAR(512) NULL,
    Role ENUM("admin", "manager", "user") NOT NULL DEFAULT 'user',
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (ID),
    UNIQUE INDEX IDX_EMAIL_UNIQUE (Email ASC)
);`;

export const productTableCreationQuery = `CREATE TABLE IF NOT EXISTS shopnow.products (
  ProductID VARCHAR(36) NOT NULL DEFAULT (UUID()),
  ProductName VARCHAR(100) NOT NULL,
  Description TEXT NOT NULL,
  Rating DECIMAL(2,1) NOT NULL,
  Price BIGINT NOT NULL,
  Category VARCHAR(100) NOT NULL,
  Discount DECIMAL(5,2) NOT NULL,
  StockQuantity BIGINT NOT NULL,
  Brand VARCHAR(100) NOT NULL,
  ThumbnailImage VARCHAR(512) NOT NULL,
  Images JSON NOT NULL,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ProductID),
  UNIQUE INDEX id_UNIQUE (ProductID ASC)
);`;

export const userTableCreationQuery=`CREATE TABLE IF NOT EXISTS shopnow.user (
    UserID VARCHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    FullName VARCHAR(200) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Street VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50),
    Country VARCHAR(50),
    PostalCode VARCHAR(20),
    DateOfBirth DATE,
    Gender ENUM('male','female','other'),
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    AuthID VARCHAR(40) NOT NULL,
    FOREIGN KEY (AuthID) REFERENCES authtable(ID)
);`;

export const cartTableCreationQuery=`CREATE TABLE IF NOT EXISTS shopnow.cart(
CartID VARCHAR(40) NOT NULL DEFAULT (UUID()) UNIQUE PRIMARY KEY,
Quantity INT,
ProductID VARCHAR(40) NOT NULL,
FOREIGN KEY(ProductID) REFERENCES products(ProductID),
AuthID VARCHAR(40) NOT NULL,
FOREIGN KEY(AuthID) REFERENCES shopnow.authtable(ID)
);`;