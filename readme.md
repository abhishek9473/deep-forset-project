**# Project Setup Guide**

- \***\*FRONTEND\*\*** : Next-js(14), Typescript, MUI-css.
- \***\*BACKEND\*\*** : Python, FastAPI, SQLAlchemy ORM, PostgreSQL.

**## setup for backend**

- navigate to the backend directory.
- Create a virtual environment by running `python -m venv fastapi-env`.
- Activate the virtual environment:
  On Windows: `.\fastapi-env\Scripts\activate`
  On macOS or Linux: `source fastapi-env/bin/activate`
- Install the required packages with `pip install -r requirements.txt`.
- create a DATABASE in Postgresql named `test` or anyother , ( if other then update this database name in `.env` file )
- Set up the database by running the existing migration files:Apply the migrations with `alembic upgrade head`.
- Start the FastAPI server by running `uvicorn app.main:app --reload`.
- Access the API at http://localhost:8000/.

**## setup for frontend**

- navigate to the ui directory.
- install node modules using `npm install`
- start development server `npm run dev` or create a build file `npm run build` and run this file using [npm start]
- server is running on http://localhost:5500/

---

**Open http://localhost:5500/ and create a account ,and after you can use this app.**
