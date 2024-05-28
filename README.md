# Job Board app

This web app has been made as a technical test for a possible job as a fullstack developer at a belgian startup. It has been made in Vue/Express/MongoDB. It is currently hosted at [this link](https://6655d59ae8a0d219622860ca--job-board-app-sd.netlify.app/).

## Run Locally

If you're interested in running this project locally there are a few steps to do so before running it.

```bash
  git clone https://github.com/SimonDeclairfayt/job-board-web-app.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies in client and server folder

```bash
  npm install
```

For the server dependencies you need to run

```bash
  npm run start
```

And for the client dependencies you need to run

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`MONGODB_URL` where you put either your local mongodb url or the one from your cluster

`STRONG_PASSWORD` A string that will make the JWT

`CLOUDINARY_NAME` `CLOUDINARY_KEY` `CLOUDINARY_SECRET` Values given when you create an account, needed to upload files.
