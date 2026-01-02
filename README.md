# Content Hub

A modern web application to store and manage different types of content (text, links, images) with optional reviews for each item.

## Features

- 📝 Store text content
- 🔗 Save and organize links
- 🖼️ Upload and display images
- 💬 Add optional reviews for any content
- 🔍 Filter content by type
- ✏️ Edit and delete content
- 🎨 Clean, responsive UI

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js + Node.js
- **Database**: MongoDB
- **File Upload**: Multer
- **API Communication**: Axios

## Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or a connection string

### 1. Clone & Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/content-hub
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB

```bash
# On Windows (if using MongoDB Community)
mongod
```

### 4. Run Development Server

```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000) concurrently.

## Project Structure

```
content-hub/
├── server/
│   ├── models/
│   │   └── Content.js          # MongoDB schema
│   ├── routes/
│   │   └── content.js          # API endpoints
│   ├── middleware/
│   │   └── upload.js           # Multer configuration
│   ├── uploads/                # Uploaded images (git-ignored)
│   └── index.js                # Express server entry
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentForm.jsx # Create/edit form
│   │   │   └── ContentCard.jsx # Content display card
│   │   ├── api.js              # Axios API client
│   │   ├── App.jsx             # Main app component
│   │   ├── index.css           # Styles
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env                        # Environment variables
├── .gitignore
└── package.json
```

## API Endpoints

### Content
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get single content
- `POST /api/content` - Create content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Reviews
- `POST /api/content/:id/reviews` - Add review
- `DELETE /api/content/:id/reviews/:reviewId` - Delete review

## Usage

1. Click **"+ Add Content"** to create new content
2. Select content type (Text, Link, or Image)
3. Fill in title, optional description, and content
4. Submit to save
5. Click **"Add Review"** on any card to add feedback
6. Use tabs to filter by content type

## Building for Production

```bash
npm run build
```

Frontend builds to `client/dist/`, ready to deploy.

## Notes

- Images are stored in `server/uploads/` (local storage)
- Max image size: 5MB
- Supported image formats: JPEG, PNG, GIF, WebP
- All timestamps are stored in UTC

---

Built with ❤️ for efficient content management
