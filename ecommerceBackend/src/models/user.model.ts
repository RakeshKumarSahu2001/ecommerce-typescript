//Query to creat database
export const dbCreationQuery=`CREATE SCHEMA IF NOT EXISTS shopnow;`;

//query to create authtable
export const authTableCreationQuery = `
    CREATE TABLE IF NOT EXISTS shopnow.authtable (
        authId INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(45) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (authId),
        UNIQUE INDEX authId_UNIQUE (authId ASC),
        UNIQUE INDEX email_UNIQUE (email ASC)
    );
`;