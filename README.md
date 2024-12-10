# Mealify - Recipe Discovery Platform

A modern recipe discovery platform built with Next.js that allows users to search, explore, and save their favorite meals from around the world. The application integrates with TheMealDB API to provide a vast collection of recipes.

## 🚀 Features

- Recipe search functionality
- Meal categories exploration
- Random meal suggestions
- Detailed recipe information
- User authentication with Clerk
- Responsive design for all devices
- Favorite recipes saving capability

## 🛠️ Tech Stack

- **Framework:** Next.js 15.0.4 with React 19
- **Styling:** TailwindCSS
- **Database:** Prisma with PostgreSQL
- **Authentication:** Clerk
- **API Integration:** TheMealDB API
- **UI Components:**
  - Lucide React (Icons)
  - Class Variance Authority
  - TailwindCSS Animate
- **Development Tools:**
  - TypeScript
  - ESLint
  - Turbopack

## 🚦 Getting Started

1. Clone the repository:

git clone <https://github.com/yourusername/mealify.git>

2. Install dependencies:

npm install

3. Set up environment variables:
   Create a .env file with the following variables:

DATABASE_URL="your_postgresql_database_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

4. Initialize the database:

npx prisma generate
npx prisma db push

5. Run the development server:

npm run dev

## 📝 Environment Variables

- DATABASE_URL: PostgreSQL database connection string
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Clerk authentication public key
- CLERK_SECRET_KEY: Clerk authentication secret key

## 🛠️ Development

- npm run dev - Start development server with Turbopack
- npm run build - Build the application
- npm run start - Start production server
- npm run lint - Run ESLint

## 📱 Project Structure

src/
├── app/ # Next.js app router pages
├── components/ # Reusable UI components
├── lib/ # Utility functions and API clients
│ ├── prisma.ts # Prisma client configuration
│ └── requests.ts # API request functions
└── types/ # TypeScript type definitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- TheMealDB for providing the recipe API
- Next.js team for the amazing framework
- Clerk for authentication services
