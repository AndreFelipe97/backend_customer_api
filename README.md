# Backend documentation

The back end was made with JS node using typescript, the database connection was made using typeorm and the tests were used jest, in addition, config editor, eslint and prettier were used to maintain the project's coding standard.

## Data structure

| Attribute | type      |
| --------- | --------- |
| id        | Number    |
| name      | String    |
| email     | String    |
| phone     | String    |
| cpf       | String    |
| createdAt | timestamp |
| updatedAt | timestamp |

## Endpoints

- List(get): /customers
- Show(get): /customers/:id
- Create(post): /customers
- Update(update): /customers/:id
- Delete(delete): /customers/:id

## step by step to deploy and run the project

#### 1st step

configure the env file, for that there is a .env.example file with all the keys that you need to fill in.

**Warning:** The TYPE DATABASE key must be filled according to the type of database you prefer, check the lib and description of the database type in the typeorm documentation https://typeorm.io/?msclkid=eb3cb23dd0dd11ec9395fc2a78b877cc.

#### 2nd step

create an ormconfig.ts file according to the ormconfig.example.ts file, remembering that you must use the keys that are in the env file.

**Warning:** It is necessary to replace the ' ' by the key that is in the .env file in this way process.env.TYPE_DATABASE.

#### 3rd step

Run yarn install command

#### 4th step

Run yarn typeorm command

**Warning:** Before executing this step, your database must be created.

#### 5º step

Run yarn test:product command

**Warning:** If all tests pass, proceed to the next step, if any errors occur, contact the developer responsible for the application.

#### 6º step

Run yarn build command

#### 7º step

After the build command runs and the project is on a hosting service at your discretion, it is recommended that it be AWS, it is necessary to configure the reverse proxy, pointing to the build folder that was generated in the previous step.
