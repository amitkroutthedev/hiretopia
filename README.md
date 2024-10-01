# Hiretopia

> A web application for finding perfect job opportunites.



![App Screenshot](https://raw.githubusercontent.com/amitkroutthedev/hiretopia/refs/heads/main/assets/Screenshot%20from%202024-10-01%2011-58-43.png)

![App Screenshot](https://raw.githubusercontent.com/amitkroutthedev/hiretopia/refs/heads/main/assets/Screenshot%20from%202024-10-01%2011-57-40.png)


## Run Locally

Clone the project

```bash
  git clone https://github.com/amitkroutthedev/hiretopia.git
```

Go to the project directory

```bash
  cd hiretopia
```

Set Environment variables `.env.local` and have keys from CLERK ([docs](https://clerk.com/docs/quickstarts/nextjs)) and [Jearch(RAPID API)](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY
RAPID_API_HOST = HOST_LINK
RAPID_API_KEY = JSEARCH_API_KEY
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

