![WORDS](./public/website.jpeg)

# [Words - my collection of thoughts](https://words.hecodesforme.com)

A modern poetry collection website built with Next.js, MongoDB (via Prisma) and an admin panel for managing poems.

## Features

- 📝 Beautiful masonry layout for poems
- 🔐 Password-protected admin panel
- 📱 Responsive design (1 column on mobile, 4 on desktop)
- 🎨 Dynamic gradient backgrounds for each poem
- ⚡ Server-side rendering with Next.js 14
- 🗄️ MongoDB with Prisma ORM for data persistence
- 🔒 Simple authentication system

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)

### Installation

1. **Clone and setup:**

    ```bash
    cd next
    npm install
    ```

2. **Environment setup:**
   Update `.env.local` with your MongoDB connection:

    ```
    DATABASE_URL="mongodb://localhost:27017/words"
    ADMIN_PASSWORD=your-admin-password
    ```

3. **Setup Prisma:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

4. **Start development server:**

    ```bash
    npm run dev
    ```

5. **Visit the site:**
    - Main site: http://localhost:3000
    - Admin panel: http://localhost:3000/admin

## Admin Panel

Access the admin panel at `/admin` with the password set in `ADMIN_PASSWORD`.

### Features:

- ✅ Add new poems with HTML formatting
- ✅ Edit existing poems
- ✅ Delete poems
- ✅ Password protection
- ✅ Rich text support (HTML tags)

### Supported HTML Tags:

- `<p>` - Paragraphs
- `<em>` - Italic emphasis
- `<strong>` - Bold emphasis
- `<br>` - Line breaks
- `<span>` - Inline styling
- CSS classes: `anything tailwind has to offer`

## Project Structure

```
next/
├── app/
│   ├── admin/           # Admin panel
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication
│   │   └── poems/      # CRUD operations
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # React components
├── lib/               # Utilities & Prisma client
├── prisma/            # Database schema & migrations
└── scripts/           # Import scripts
```

## API Endpoints

- `GET /api/poems` - Get all poems
- `POST /api/poems` - Create new poem
- `GET /api/poems/[id]` - Get specific poem
- `PUT /api/poems/[id]` - Update poem
- `DELETE /api/poems/[id]` - Delete poem
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

## Deployment

1. **Build the project:**

    ```bash
    npm run build
    ```

2. **Start production server:**

    ```bash
    npm start
    ```

## Technologies Used

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, MongoDB, Prisma ORM
- **Authentication:** Custom cookie-based auth
- **Styling:** Tailwind CSS with custom fonts
- **Layout:** CSS Masonry Grid

## License

Private project for @sujalgoel

> Feel free to use this code as a reference for your own projects, but please do not copy it directly without permission.
