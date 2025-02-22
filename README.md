# News Aggregator

A React + TypeScript project built with Vite.

## 🚀 Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
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

## 📝 Code Style & Formatting

This project uses Prettier and ESLint to maintain consistent code style across the team.

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

1. Install the Prettier extension:

   - Open VS Code
   - Press `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (Mac)
   - Search for "Prettier - Code formatter"
   - Install the extension by "Prettier"

2. The project includes VS Code settings (`.vscode/settings.json`) that will:
   - Enable format on save
   - Set Prettier as the default formatter
   - Enable ESLint auto-fix on save

### Manual Formatting

You can format code in several ways:

- **Format on Save**: Files will automatically format when you save
- **Keyboard Shortcut**: `Alt+Shift+F` (Windows) or `Cmd+Shift+F` (Mac)
- **Command Line**:

  ```bash
  # Format all files
  npm run format

  # Check if files are formatted correctly
  npm run format:check
  ```

## 🛠️ Technology Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: SASS
- **Code Quality**:
  - ESLint
  - Prettier
  - TypeScript strict mode

## 📁 Project Structure

```
news-aggregator/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # React components
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Application entry point
│   ├── App.scss       # App-specific styles
│   └── index.scss     # Global styles
├── public/            # Public static files
├── .vscode/          # VS Code settings
├── .prettierrc       # Prettier configuration
├── .prettierignore   # Prettier ignore patterns
├── eslint.config.js  # ESLint configuration
└── vite.config.ts    # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are formatted correctly

## 🔄 Git Workflow

Before committing:

1. Ensure all files are formatted: `npm run format`
2. Run linting: `npm run lint`
3. Make sure the project builds: `npm run build`
