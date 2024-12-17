
# Orbivent

## Project Overview

**Orbivent** is a Next.js-based application where:

- **Users** can:
  - Register on the platform.
  - View a list of available events.
  - Register for specific events.

- **Admins** can:
  - Create and delete events.
  - View the list of registered users for an event.
  - Export user lists as CSV files.
  - Toggle the status of events (ON/OFF).

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14+)
- **npm** (Node Package Manager)

---

### Installation

Clone the repository:

```bash
git clone https://github.com/DevFaisal/orbivent.git
cd orbivent
```

Install the dependencies:

```bash
npm install
```

---

### Environment Variables

1. Create a `.env` file in the root directory.
2. Copy the contents of `.env.sample` into `.env` and fill in the required values.

Example:
```env
SESSION_SECRET=secret-string-for-encoding
MONGODB_URI=your-database-connection-string
```

---

### Development Server

To run the project in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Scripts

- **`npm run dev`**: Runs the development server.
- **`npm run build`**: Builds the application for production.
- **`npm start`**: Runs the production build.
- **`npm run lint`**: Checks for linting issues.

---

## Folder Structure

```
/public            - Static assets (images, icons, etc.)
/src
  /actions         - Server-side actions 
  /app             - Application routing logic
  /components      - Reusable React components
  /context         - Global state/context management
  /lib             - Utility functions and helpers
  /models          - Database models
  /providers       - Context or API providers
  middleware.js    - Custom middleware for request handling
.env               - Environment variables file
.env.sample        - Sample environment variables
.gitignore         - Files and directories to ignore in version control
eslint.config.mjs  - ESLint configuration
tailwind.config.mjs- Tailwind CSS configuration
postcss.config.mjs - PostCSS configuration
package.json       - Project metadata and scripts
README.md          - Project documentation
```

---

## Features

1. **User Features**:
   - User Registration
   - Event Viewing
   - Event Registration

2. **Admin Features**:
   - Create/Delete Events
   - Toggle Event Status (ON/OFF)
   - Export Event Users as CSV
   - View Registered Users

---

## Technologies Used

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Middleware
- **Database**: MongoDB using mongoose
- **CSV Export**: JavaScript libraries (e.g., `csv-stringify`)

---

## Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

3. Deploy on platforms like Vercel, Netlify, or any Node-compatible server.

---


4. Open a pull request.

## Contact

**Maintainer**: Faisal Farooq  
**Email**: [dfaisal59@gmail.com](mailto:dfaisal59@gmail.com)

