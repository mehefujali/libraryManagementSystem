# Library Management System API

A robust RESTful API for managing library operations including book inventory, borrowing, and returns.

## 🚀 Features

- **Book Management**: CRUD operations for books with advanced filtering and sorting
- **Borrowing System**: Track book borrowings with due dates and quantity management
- **Inventory Control**: Automatic copy management and availability tracking
- **Data Validation**: Comprehensive input validation and error handling
- **TypeScript**: Full TypeScript support with strict type checking
- **MongoDB**: Scalable NoSQL database with Mongoose ODM
- **RESTful API**: Clean, intuitive API endpoints following REST conventions

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Development**: ts-node-dev for hot reloading
- **Code Quality**: ESLint with TypeScript support

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/libraryManagementSystem
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/books` | Create a new book |
| `GET` | `/api/books` | Get all books with filtering and pagination |
| `GET` | `/api/books/:id` | Get a specific book by ID |
| `PUT` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |

### Borrowing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/borrow` | Borrow a book |
| `GET` | `/api/borrow` | Get all borrowed books |

## 📖 Usage Examples

### Create a Book
```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "FICTION",
    "isbn": "978-0743273565",
    "description": "A story of the fabulously wealthy Jay Gatsby",
    "copies": 5
  }'
```

### Get Books with Filtering
```bash
curl "http://localhost:8080/api/books?filter=FICTION&sortBy=title&sort=asc&limit=10"
```

### Borrow a Book
```bash
curl -X POST http://localhost:8080/api/borrow \
  -H "Content-Type: application/json" \
  -d '{
    "book": "64f8a1b2c3d4e5f6a7b8c9d0",
    "quantity": 1,
    "dueDate": "2024-01-15T00:00:00.000Z"
  }'
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── controllers/     # Request handlers
│   ├── interface/       # TypeScript interfaces
│   ├── models/          # Mongoose models
│   └── routes/          # API routes
├── config/              # Configuration files
├── app.ts              # Express app setup
└── server.ts           # Server entry point
```

## 🔍 Data Models

### Book Schema
```typescript
{
  title: string;           // Book title
  author: string;          // Author name
  genre: string;           // Book genre (FICTION, NON_FICTION, etc.)
  isbn: string;            // Unique ISBN
  description?: string;    // Optional description
  copies: number;          // Number of available copies
  available: boolean;      // Availability status
  createdAt: Date;         // Creation timestamp
  updatedAt: Date;         // Last update timestamp
}
```

### Borrow Schema
```typescript
{
  book: ObjectId;          // Reference to Book
  quantity: number;        // Number of copies borrowed
  dueDate: Date;           // Return due date
  createdAt: Date;         // Borrow timestamp
  updatedAt: Date;         // Last update timestamp
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/library
NODE_ENV=production
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

### Code Quality
This project uses ESLint with TypeScript support for maintaining code quality and consistency.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

