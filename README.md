# News Aggregator
![MyGifRecord](https://github.com/user-attachments/assets/d5a9743a-b64f-4e4b-aea8-b32e23fbae9d)

A React + TypeScript project built with Vite that aggregates news from various sources.

## 🐳 Docker Setup (Recommended)

The easiest way to get started is using Docker.

### Prerequisites

- Docker installed on your machine
- Docker Compose (optional, for development)

### Quick Start with Docker

1. Build and run with a single command:

```bash
docker compose up -d
```

Or manually:

```bash
docker build -t news-aggregator .
docker run -d -p 8080:80 --name news-aggregator news-aggregator
```

The application will be available at `http://localhost:8080`

### Docker Commands Reference

- **Stop the container**:

  ```bash
  docker stop news-aggregator
  ```

- **Remove the container**:

  ```bash
  docker rm news-aggregator
  ```

- **View container logs**:

  ```bash
  docker logs news-aggregator
  ```

- **Rebuild and run (after changes)**:
  ```bash
  docker build -t news-aggregator .
  docker stop news-aggregator
  docker rm news-aggregator
  docker run -d -p 8080:80 --name news-aggregator news-aggregator
  ```

## 🚀 Local Development Setup

### Prerequisites

- Node.js (v18 LTS or newer)
- npm (v9 or newer)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AhmedAlaaEzzt/news-aggregator.git
cd news-aggregator
```

2. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

To create a production build:

```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend**:
  - React 19 with TypeScript
  - Vite for build tooling
  - SASS for styling
  - React Query for data fetching
  - Axios for HTTP requests
- **Code Quality**:
  - ESLint for linting
  - Prettier for code formatting
  - TypeScript in strict mode
  - Jest and React Testing Library for testing

## 📁 Project Structure

```
news-aggregator/
├── src/
│   ├── assets/         # Static assets (images, fonts)
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── services/      # API services and utilities
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── context/       # React context providers
│   ├── styles/        # Global styles and variables
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Application entry point
│   └── vite-env.d.ts  # Vite type declarations
├── public/            # Public static files
├── .vscode/          # VS Code settings
├── .github/          # GitHub workflows
├── docker/           # Docker configuration files
├── .env.example      # Example environment variables
├── .prettierrc       # Prettier configuration
├── .prettierignore   # Prettier ignore patterns
├── .eslintrc.js      # ESLint configuration
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
├── jest.config.js    # Jest configuration
└── package.json      # Project dependencies and scripts
```

## 📝 Code Style & Formatting

This project uses Prettier and ESLint to maintain consistent code style.

### Prettier Configuration

We use the following Prettier configuration (`.prettierrc`):

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "arrowParens": "avoid",
  "endOfLine": "auto",
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "quoteProps": "as-needed",
  "bracketSameLine": false
}
```

### VS Code Setup

1. Install the Prettier extension
2. The project includes VS Code settings for:
   - Format on save
   - Prettier as default formatter
   - ESLint auto-fix on save

### Manual Formatting

- **Format on Save**: Automatic formatting
- **Keyboard Shortcut**: `Alt+Shift+F` (Windows) or `Cmd+Shift+F` (Mac)
- **Command Line**:
  ```bash
  npm run format        # Format all files
  npm run format:check  # Check formatting
  ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format all files
- `npm run format:check` - Check formatting
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🔄 Git Workflow

Before committing:

1. Format code: `npm run format`
2. Check linting: `npm run lint`
3. Verify build: `npm run build`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
