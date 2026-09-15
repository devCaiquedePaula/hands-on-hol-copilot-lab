# The Daily Harvest

The Daily Harvest is a frontend e-commerce demonstration built with React, TypeScript, and Vite.

Users can browse fruit products, add items to a shopping cart, submit product reviews, and simulate checkout. The application also includes a simple admin login and sale-management screen.

This project is intended for training and demonstration purposes. It does not include a backend, database, real authentication, or payment processing.

## Quick Start Guide

### Prerequisites

- Node.js version 18 or higher
- npm
- A modern web browser

### Installation

From the repository root, navigate to the application directory:

```bash
cd hands-on-hol-copilot-lab/eCommApp
```

Install the project dependencies:

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

The development server is configured to open the browser automatically.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Type-checks the project and creates a production build |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |
| `npm run test` | Starts Vitest in watch mode |
| `npm run test:run` | Runs all tests once |
| `npm run test:coverage` | Runs tests and generates coverage reports |

The production build is generated in the `dist/` directory.

## Application Routes

| Route | Purpose |
|---|---|
| `/` | Store home page |
| `/products` | Product catalog |
| `/cart` | Shopping cart and checkout |
| `/login` | Admin login |
| `/admin` | Admin portal |

## Demo Admin Credentials

The current demo login uses fixed credentials:

```text
Username: admin
Password: admin
```

These credentials are for demonstration purposes only and must not be used in a production application.

## Features

- Product catalog loaded from local JSON files
- Product images and stock status
- Add products to a shopping cart
- Quantity tracking for cart items
- Simulated checkout confirmation
- Product review display and submission
- Admin login flow
- Simulated store-wide sale percentage
- Responsive layout
- Unit and component testing with Vitest and React Testing Library

## Project Structure

```text
eCommApp/
├── public/
│   └── products/
│       ├── apple.json          # Apple product data
│       ├── grapes.json         # Grapes product data
│       ├── orange.json         # Orange product data
│       ├── pear.json           # Pear product data
│       └── productImages/      # Product images
├── src/
│   ├── components/             # Pages and reusable UI components
│   │   ├── AdminPage.tsx       # Admin portal
│   │   ├── CartPage.tsx        # Cart and checkout
│   │   ├── CheckoutModal.tsx   # Checkout confirmation dialog
│   │   ├── Footer.tsx          # Application footer
│   │   ├── Header.tsx          # Navigation header
│   │   ├── HomePage.tsx        # Store home page
│   │   ├── LoginPage.tsx       # Admin login
│   │   ├── ProductsPage.tsx    # Product catalog
│   │   └── ReviewModal.tsx     # Product reviews
│   ├── context/
│   │   └── CartContext.tsx     # Shared shopping cart state
│   ├── test/
│   │   ├── setup.ts            # Global test setup
│   │   └── test-utils.tsx      # Shared test rendering helpers
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   └── helpers.ts          # Shared utility functions
│   ├── App.tsx                 # Application routes
│   ├── App.css                 # Application styles
│   ├── index.css               # Global styles
│   └── main.tsx                # React entry point
├── index.html                  # HTML entry template
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # Application TypeScript settings
├── tsconfig.node.json          # TypeScript settings for Vite
├── vite.config.ts              # Vite and Vitest configuration
└── README.md                   # Project documentation
```

## Important Files

### `src/main.tsx`

The application entry point. It mounts the React application and configures `BrowserRouter`.

### `src/App.tsx`

Defines the application routes and wraps the pages with `CartProvider`.

### `src/context/CartContext.tsx`

Manages shared shopping cart state. It provides functions for adding products and clearing the cart.

### `src/components/ProductsPage.tsx`

Loads product data from JSON files, displays product cards, handles stock status, and opens the review dialog.

### `src/components/CartPage.tsx`

Displays cart items and manages the simulated checkout process.

### `src/types/index.ts`

Defines the main TypeScript data structures, including `Product` and `Review`.

### `public/products/`

Contains the product JSON files and product images loaded by the application at runtime.

### `vite.config.ts`

Configures the development server, production build, Vitest, and coverage reporting.

### `package.json`

Defines the project dependencies and available development commands.

## Technology Stack

- **React**: Builds the user interface with reusable components.
- **TypeScript**: Adds static typing to the application.
- **Vite**: Provides the development server and production build system.
- **React Router**: Handles client-side navigation.
- **Vitest**: Provides the test runner.
- **React Testing Library**: Tests React components through user-facing behavior.
- **ESLint**: Checks source code for common problems and style issues.

## Testing

Tests use Vitest, React Testing Library, `jsdom`, and `jest-dom`.

Run tests in watch mode while developing:

```bash
npm run test
```

Run all tests once:

```bash
npm run test:run
```

Generate test coverage reports:

```bash
npm run test:coverage
```

The coverage reports are generated in the `coverage/` directory.

Existing component tests are colocated with the components they test, such as `src/components/CartPage.test.tsx`.

Shared test configuration is located in `src/test/setup.ts` and `src/test/test-utils.tsx`.

## Data and Persistence

Product data is stored in `public/products/` and loaded by the browser at runtime.

The application currently stores data only in memory:

- Cart contents are lost when the page is refreshed.
- New product reviews are lost when the page is refreshed.
- Checkout only simulates order processing.
- There is no database or API server.
- There is no real payment processing.
- The admin login is not connected to a real authentication system.
- The admin sale percentage is displayed but does not currently change product prices.

## Configuration

### `vite.config.ts`

Controls the React plugin, development server port `3000`, automatic browser opening, production output directory, source maps, Vitest, and coverage reporting.

### `tsconfig.json`

Controls TypeScript for the application source. It enables strict type checking, JSX support, JSON imports, modern module resolution, unused local and parameter checks, and type checking without emitting compiled files.

### `tsconfig.node.json`

Provides TypeScript settings for Node-based configuration files such as `vite.config.ts`.

### `index.html`

Defines the HTML page shell, document title, root element, and React entry script.

There are currently no environment variables or external services required to run the application.

## Recommended Development Workflow

Before submitting changes, run:

```bash
npm run lint
npm run test:run
npm run build
```

When adding a feature:

1. Add or update the relevant component.
2. Update shared types if the data model changes.
3. Add tests for the new behavior.
4. Run linting, tests, and the production build.

## Troubleshooting

### Port 3000 Is Already in Use

Stop the process using port `3000`, or change the `server.port` value in `vite.config.ts`.

### Product Data or Images Do Not Load

Make sure the development server is running from the `eCommApp` directory and that the product files exist under `public/products/`.

### Dependencies Are Missing or Corrupted

On macOS or Linux:

```bash
rm -rf node_modules
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### The Build Fails

Run the following commands separately to identify the problem:

```bash
npm run lint
npm run test:run
npm run build
```

Check the terminal output for TypeScript, ESLint, or test errors.
