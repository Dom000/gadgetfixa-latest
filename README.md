# Gadget Fixa

A modern, full-stack web platform that connects customers with skilled artisans for gadget repairs and maintenance services. Built with Next.js 14, TypeScript, and Prisma, Gadget Fixa provides a comprehensive marketplace for repair services with business management, real-time messaging, and review systems.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Code Pages Documentation](#code-pages-documentation)
- [Components Documentation](#components-documentation)
- [Controllers & API](#controllers--api)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Features](#features)
- [Development](#development)

## Overview

Gadget Fixa is a marketplace platform designed to bridge the gap between customers seeking repair services and skilled artisans offering those services. The platform features:

- **Customer Portal**: Browse, search, and contact artisans for repair services
- **Artisan Dashboard**: Manage business profiles, portfolios, and customer interactions
- **Admin Panel**: Oversee platform operations and user management
- **Messaging System**: Direct communication between customers and service providers
- **Review System**: Customer feedback and ratings for service quality

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Zustand** - Global state management
- **TanStack Query** - Data fetching and caching

### Backend
- **Prisma ORM** - Database management
- **PostgreSQL** - Primary database
- **Better Auth** - Authentication system
- **Argon2** - Password hashing
- **Cloudinary** - Image storage and management
- **Supabase** - Additional backend services

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## Project Structure

> **Note**: Some directories and files in the codebase use the spelling "bussiness" and "porfolio". These are documented as they appear in the actual codebase for accuracy.

```
gadgetfixa-latest/
├── app/                      # Next.js app directory (pages and routes)
│   ├── admin/               # Admin dashboard pages
│   ├── artisans/            # Artisan listing and detail pages
│   ├── auth/                # Authentication pages
│   ├── home/                # User dashboard pages
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── inbox/              # Messaging components
│   ├── my-bussiness/       # Business management components
│   ├── ui/                 # Reusable UI components (Shadcn)
│   └── *.tsx               # Shared components
├── controllers/             # API controllers
│   ├── business/           # Business logic
│   ├── message/            # Messaging logic
│   ├── profile/            # User profile logic
│   └── review/             # Review system logic
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and configurations
│   ├── prisma/             # Prisma client and types
│   ├── auth.ts             # Authentication configuration
│   ├── client.ts           # API client setup
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema and migrations
│   ├── migrations/         # Database migration files
│   └── schema.prisma       # Prisma schema definition
├── providers/               # React context providers
├── stores/                  # Zustand state management
│   ├── slice/              # State slices
│   └── store/              # Store configuration
├── types/                   # TypeScript type definitions
└── public/                  # Static assets

```

## Code Pages Documentation

### Public Pages

#### `/app/page.tsx` - Landing Page
**Purpose**: Main landing page for the platform

**Features**:
- Hero section with call-to-action buttons
- Feature highlights (Verified Artisans, Fast Service, Quality Guaranteed)
- Platform statistics display
- Customer testimonials
- Links to browse artisans or join as an artisan

**Key Components**: Header, TestimonialCard, Button, Card

---

#### `/app/auth/page.tsx` - Authentication
**Purpose**: User login and registration

**Features**:
- Tabbed interface (Login/Sign Up)
- Email/password authentication
- Google OAuth integration (prepared)
- Form validation with Zod
- Session management
- Redirects to home on successful authentication

**Key Components**: Form, Input, Button, Tabs

**Authentication Flow**:
1. User enters credentials
2. Better Auth validates credentials
3. On success, user profile is fetched
4. User is redirected to `/home` dashboard

---

#### `/app/artisans/page.tsx` - Artisan Listing
**Purpose**: Browse and search available artisans

**Features**:
- Search functionality (by name, shop, or specialty)
- Category filtering
- Sort options (Top Rated, Most Reviews, Name A-Z)
- Location filtering
- Grid display of artisan cards
- Load more functionality
- Real-time data fetching with React Query

**Key Components**: ArtisanCard, Input, Select, Button, Badge

**Data Flow**: Fetches business data from API → Filters based on search/category → Displays in grid

---

#### `/app/artisans/[id]/page.tsx` - Artisan Detail Page
**Purpose**: Detailed view of individual artisan/business

**Features**:
- Business profile information (name, occupation, description)
- Star rating display
- Service categories/specialties
- Contact information (phone, address)
- Portfolio gallery
- Customer reviews and ratings
- Review submission form
- Direct messaging capability
- Anonymous review support

**Key Components**: StarRating, Badge, Dialog, PortfolioCard, CommentRatingCard, RatingCard

**Interactions**:
- View artisan details and portfolios
- Submit reviews with ratings
- Send direct messages (requires authentication)
- Anonymous users can view but need to log in for messaging

---

### Authenticated User Pages (Dashboard)

All pages under `/app/home/` require user authentication and share a common layout with sidebar navigation.

#### `/app/home/page.tsx` - User Dashboard (My Business)
**Purpose**: Main dashboard for managing artisan businesses

**Features**:
- Displays all businesses owned by the user
- "Create New" button for adding businesses
- Business card grid display
- Navigation breadcrumbs

**Key Components**: BreadCrumb, BussinessCard, Button

---

#### `/app/home/my-businesses/create/page.tsx` - Create Business
**Purpose**: Form for creating a new artisan business

**Features**:
- Comprehensive business registration form
- Fields: Business name, occupation, description, categories, email, phone, address, website
- Multi-select category picker
- Form validation with Zod
- Success/error notifications
- Automatic form reset on success

**Form Fields**:
- Business Name (required)
- Occupation (required)
- Description (required, min 10 chars)
- Categories (multi-select, required)
- Business Email (required, validated)
- Phone (required, min 10 digits)
- Address (required, min 5 chars)
- Website (optional, URL validated)

**Key Components**: Form, Input, Textarea, MultiSelect, Button

---

#### `/app/home/my-businesses/[id]/page.tsx` - Edit Business
**Purpose**: View and manage individual business

**Features** (based on structure):
- Edit business details
- Manage portfolio items
- View business analytics
- Handle customer inquiries

---

#### `/app/home/inbox/page.tsx` - Messaging Inbox
**Purpose**: Direct messaging between users and artisans

**Features**:
- Real-time message display
- Auto-refresh messages (5-second interval)
- Message history between two users
- Empty state for new conversations
- Mobile-responsive with back navigation
- Query parameters for user identification

**Key Components**: MessageList, Empty, Button

**Technical Details**:
- Uses URL query params: `?user1={id}&user2={id}`
- Auto-refetches messages every 5 seconds
- Displays message thread in chronological order

---

#### `/app/home/account/page.tsx` - Account Settings
**Purpose**: User account information management

**Features**:
- Display user profile information
- Fields: Full Name, Email, Phone
- Read-only mode (editing disabled)
- Future enhancement: Enable editing

**Key Components**: Input, Label, Button, BreadCrumb

---

#### `/app/home/reviews/page.tsx` - User Reviews
**Purpose**: Manage reviews given by the user

**Features**: (Placeholder - minimal implementation)
- View all reviews submitted
- Edit or delete reviews
- Review history

---

### Admin Pages

#### `/app/admin/page.tsx` - Admin Dashboard
**Purpose**: Platform administration interface

**Features**: (Currently placeholder)
- User management
- Business verification
- Platform analytics
- Content moderation

**Key Components**: BreadCrumb

---

## Components Documentation

### Core Components

#### `ArtisanCard.tsx`
Displays artisan/business summary in grid view with avatar, name, rating, and quick actions.

#### `TestimonialCard.tsx`
Shows customer testimonials with avatar, name, rating, and review text.

#### `StarRating.tsx`
Reusable star rating display component that calculates average ratings from reviews array.

#### `RatingCard.tsx`
Interactive rating input component for users to submit ratings (1-5 stars).

#### `CustomBreadcrumb.tsx`
Navigation breadcrumb component for showing current page location and navigation path.

#### `Header.tsx`
Main navigation header with logo, navigation links, and user authentication state.

#### `SideBar.tsx`
Sidebar navigation for authenticated user dashboard with menu items and team switcher.

### Business Management Components

#### `my-bussiness/BussinessCard.tsx`
Displays business cards in user dashboard with edit/manage actions.

#### `my-bussiness/PorfolioCard.tsx`
Shows portfolio items (work samples) with images and descriptions.

#### `my-bussiness/CommentRatingCard.tsx`
Displays individual review/rating entries with user info, rating, and comment.

### Messaging Components

#### `inbox/MessageList.tsx`
Renders message thread with send/receive message display.

#### `inbox/MessageCard.tsx`
Individual message bubble component with sender info and timestamp.

#### `inbox/MessageSideBar.tsx`
Sidebar showing conversation list and contacts.

#### `inbox/LayoutWrapper.tsx`
Layout wrapper for inbox pages with responsive design.

### UI Components

The `components/ui/` directory contains reusable UI components from Shadcn/ui:
- `button.tsx` - Button variants (hero, outline, destructive, etc.)
- `card.tsx` - Card container with header, content, footer
- `input.tsx` - Form input fields
- `textarea.tsx` - Multi-line text input
- `dialog.tsx` - Modal dialogs
- `select.tsx` - Dropdown select menus
- `badge.tsx` - Label badges
- `form.tsx` - Form field wrappers with validation
- `toast.tsx` - Notification toasts
- `tabs.tsx` - Tabbed interfaces
- `empty.tsx` - Empty state displays
- And many more...

---

## Controllers & API

Controllers handle business logic and API operations. They're organized by domain:

### `/controllers/business/index.controller.ts`
**Functions**:
- `getBusiness(pageNumber)` - Fetch paginated business listings
- `getBusinessById(id)` - Get single business details
- `createBusiness(data)` - Create new business profile

**Used By**: Artisan listing page, artisan detail page, create business page

### `/controllers/profile/index.controller.ts`
**Functions**:
- `getProfileById(userId)` - Fetch user profile data
- `updateProfile(data)` - Update user information

**Used By**: Authentication flow, account settings

### `/controllers/message/index.controller.ts`
**Functions**:
- `getMessagesBetweenUsers(user1, user2)` - Fetch message thread
- `sendMessage(data)` - Send new message
- Message inbox management

**Used By**: Inbox page, artisan detail page

### `/controllers/review/index.controller.ts`
**Functions**:
- `sendReview(data)` - Submit new review/rating
- `getReviews(businessId)` - Fetch reviews for business

**Used By**: Artisan detail page, review submission

---

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:

### Core Models

#### **Profile** (User accounts)
- User authentication and profile data
- Linked to: Businesses, Reviews, Messages
- Fields: fullName, email, phone, avatarUrl, role, banned status

#### **Business** (Artisan businesses)
- Business profiles for service providers
- Linked to: Profile (owner), Categories, Portfolios, Reviews
- Fields: name, occupation, description, address, phone, email, website

#### **Category**
- Service categories/specialties
- Linked to: Business (many-to-many relationship)
- Fields: name

#### **Portfolio**
- Work samples/showcase items
- Linked to: Business
- Fields: title, description, imageUrl

#### **Review**
- Customer ratings and reviews
- Linked to: Profile (reviewer), Business
- Fields: rating (1-5), comment, anonymous flag, anonymousName
- Supports both authenticated and anonymous reviews

### Communication Models

#### **Message**
- Direct messages between users
- Linked to: Inbox, Profile (sender), Profile (receiver)
- Fields: content, senderId, receiverId, timestamps

#### **Inbox**
- Conversation containers
- Linked to: Message (one-to-many), Profile (two participants)
- Fields: participant1, participant2
- Ensures unique conversations between user pairs

### Authentication Models

#### **Account**
- OAuth and credential storage
- Linked to: Profile
- Fields: providerId, accessToken, refreshToken, password hash

#### **Session**
- User session management
- Linked to: Profile
- Fields: token, expiresAt, ipAddress, userAgent

#### **Verification**
- Email verification tokens
- Fields: identifier, value, expiresAt

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dom000/gadgetfixa-latest.git
   cd gadgetfixa-latest
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/gadgetfixa"
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Features

### For Customers
- ✅ Browse verified artisans by category and location
- ✅ View detailed artisan profiles with portfolios
- ✅ Read customer reviews and ratings
- ✅ Direct messaging with service providers
- ✅ Submit reviews and ratings
- ✅ Anonymous browsing and review submission

### For Artisans (Service Providers)
- ✅ Create and manage business profiles
- ✅ Showcase work through portfolio galleries
- ✅ Multi-category service offerings
- ✅ Receive and respond to customer messages
- ✅ Manage customer reviews
- ✅ Contact information display

### Platform Features
- ✅ Secure authentication (email/password)
- ✅ Real-time messaging system
- ✅ Review and rating system
- ✅ Responsive mobile-first design
- ✅ Search and filter capabilities
- ✅ Image upload and management
- ✅ Form validation and error handling
- ⏳ Payment processing (planned)
- ⏳ Google OAuth (prepared, not active)
- ⏳ Service booking system (planned)

---

## Development

### Project Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Database commands
npx prisma studio        # Open Prisma Studio (database GUI)
npx prisma migrate dev   # Create and apply migrations
npx prisma generate      # Generate Prisma Client
```

### Code Style & Conventions

- **TypeScript**: Strict mode enabled for type safety
- **Components**: Functional components with TypeScript
- **Styling**: Tailwind CSS utility classes
- **State Management**: 
  - Local state: React hooks (useState, useEffect)
  - Global state: Zustand store
  - Server state: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **API**: Controller pattern with async/await

### Database Workflow

1. Modify schema in `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name description`
3. Generate client: `npx prisma generate`
4. Import types from `@/lib/prisma/generated`

### Adding New Features

1. **Create database model** (if needed) in `schema.prisma`
2. **Add controller** in `controllers/` directory
3. **Create UI components** in `components/`
4. **Add page** in `app/` directory
5. **Update types** in `types/` directory
6. **Test and validate** forms and functionality

---

## Architecture Patterns

### State Management
- **Zustand Store** (`stores/`): Global state (user details, chat view)
- **React Query**: Server state, caching, and data fetching
- **Form State**: React Hook Form for complex forms

### Data Flow
1. User interaction triggers action
2. Controller function makes API call
3. Prisma queries database
4. Data returned to component
5. UI updates via React state/React Query

### Authentication Flow
1. User submits credentials via `/auth` page
2. Better Auth validates and creates session
3. Session stored in database and cookie
4. Protected routes check session
5. User data loaded into Zustand store
6. Accessible across application

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is proprietary software. All rights reserved.

---

## Support

For issues, questions, or support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ for artisans and customers seeking quality repair services.**
