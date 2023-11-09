# BYTE Recipes Website Project

This website is built with a technology stack that includes JavaScript, HTML, CSS, and interfaces with a powerful MySQL database. It runs on the Node.js platform and makes use of the Express.js framework for speedy server-side operations.

This project serves as a full display for my accomplishments in self-taught web programming. It serves as a mock recipe website with a variety of user-friendly features. Users can create, read, update, and delete recipes with astonishing ease. In addition, my project has a social component. Users can comment on and review recipes, creating a vibrant community experience that adds a new element of involvement to the website.

## Install
Start by running `npm install`

Access the MySQL Command Line Client by running `mysql -u="username" -p="password"`. 

Create database tables and seed data by running `source config/schema.sql`.

## Configuration
### .env
This project contains a `.env.example` file that may be used to create the `.env` file. The `.env` file is intended to concentrate environment variable management within the project directory, ensuring secure and structured storage of configuration values.

### Database
The configuration file, `config/db.js`, includes a reference to several environment variables for the database. You must use these variables in your `.env` file for the database to function properly.
```
DATABASE_URL =
DATABASE_USER =
DATABASE_NAME =
DATABASE_PORT =
DATABASE_PASS =
```

### Cloudinary
To configure the Cloudinary API, you should define the `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` parameters within your `.env` file. This setup is essential for enabling seamless photo uploads to your personal Cloudinary account. It's worth noting that this configuration is optional, as the project includes built-in mock Cloudinary API interactions.

## Run
This project can be run by using `npm run watch`.

## Dependencies
- [body-parser](https://www.npmjs.com/package/body-parser)
- [bootstrap-icons](https://www.npmjs.com/package/bootstrap-icons)
- [cloudinary](https://www.npmjs.com/package/cloudinary)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [daysjs](https://www.npmjs.com/package/dayjs)
- [ejs](https://ejs.co/)
- [express](https://expressjs.com/)
- [express-flash](https://www.npmjs.com/package/express-flash)
- [express-mysql-session](https://www.npmjs.com/package/express-mysql-session)
- [express-session](https://www.npmjs.com/package/express-session)
- [multer](https://www.npmjs.com/package/multer)
- [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [node.js](https://nodejs.org/en)
- [parseurl](https://www.npmjs.com/package/parseurl)
- [passport](https://www.passportjs.org/)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [path](https://www.npmjs.com/package/path)

### Dev Dependencies
- [dotenv](https://www.npmjs.com/package/dotenv)
- [esbuild](https://esbuild.github.io/api/)
- [flydotio/dockerfile](https://www.npmjs.com/package/@flydotio/dockerfile)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)