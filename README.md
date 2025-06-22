📚 Library Management System – 
Built this mini project using Express, TypeScript, and MongoDB. Nothing too fancy — just basic book management and borrowing stuff. Keeping it here in case I come back later to improve it or reuse the code.

💡 What It Does
Can add, edit, delete, and fetch books

Borrow books (with checks for available copies)

Filter books by genre, sort them by fields

Borrow summary using aggregation pipeline

Full schema validation — no garbage data allowed

Pre-save hooks and static methods for future enhancements

Clean error responses — not perfect but does the job

🧰 Tech Stack
Express.js + TypeScript

MongoDB (via Mongoose)

Middlewares: CORS, JSON parsing, and some basic checks

⚙️ Setup (So I Don't Forget)
bash
Copy
Edit
git clone <repo-url>
cd Library-Management-System
npm install
Then create a .env file with:

env
Copy
Edit
PORT=8080
MONGO_URI=mongodb://localhost:27017/libraryManagementSystem
To run locally:

bash
Copy
Edit
npm run dev
That’s it. Server should be up at http://localhost:8080

📫 API Notes (for myself, if I forget)
Books
Add Book
POST /api/books

json
Copy
Edit
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "Some description",
  "copies": 5
}
Get All Books
GET /api/books
Supports: ?filter=GENRE&sortBy=createdAt&sort=desc&limit=5

Get One Book
GET /api/books/:id

Update Book
PUT /api/books/:id

Delete Book
DELETE /api/books/:id

Borrow
Borrow Book
POST /api/borrow

json
Copy
Edit
{
  "book": "ObjectId",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
Get Borrow Summary
GET /api/borrow
Returns total quantity of each borrowed book using aggregation

📂 Folder Structure (for future me)
arduino
Copy
Edit
src/
├── app/
│   ├── controllers/
│   ├── interface/
│   ├── models/
│   └── routes/
├── config/
├── app.ts
└── server.ts
🧠 Important Notes
Borrow logic checks if enough copies are available before creating record

Automatically reduces book copies when borrowed

Marks a book unavailable when copies = 0

Validates that dueDate is in the future (no past nonsense)

Aggregation is used for borrow summary (not manual loops)

🧹 Scripts
bash
Copy
Edit
npm run dev      # Dev server with hot reload
npm run build    # Compiles TS -> JS
npm start        # Runs the compiled version
Status
Still a work-in-progress. Basic flow works fine. Might add return flow and admin dashboard later (if I don’t get lazy).

