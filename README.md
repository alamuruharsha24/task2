# Next.js Firebase Authentication

This is a Next.js application with Firebase authentication, featuring a professional UI, interactive background, and protected routes.

## Features

- **Professional Authentication UI**
  - Modern login/signup pages with floating labels
  - Google authentication integration
  - Password strength indicator
  - Comprehensive error handling with specific messages
  - Password reset functionality
  - Toast notifications for success and error states

- **Interactive Background**
  - Dynamic radial gradient that follows cursor movement
  - Smooth animations using requestAnimationFrame
  - Subtle particle overlay effect
  - Optimized performance with debounced event listeners

- **Protected Routes**
  - Dashboard with user profile information
  - Authentication state management
  - Automatic redirection for unauthenticated users

- **System Architecture**
  - Comprehensive system diagram
  - Authentication flow visualization
  - Token validation process documentation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account with Email/Password and Google authentication enabled

### Environment Variables

Create a `.env.local` file in the root directory with the following variables (see `.env.example`):

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
\`\`\`

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## System Diagram

The system diagram illustrating the authentication flow can be found at `/diagram` route or in the `/docs` directory as `system-diagram.png`.

### Authentication Flow

1. **User Authentication:** User enters credentials on Login/Signup page or uses Google authentication
2. **Auth UI Processing:** Form validation occurs, errors are handled, and credentials are sent to Firebase
3. **Firebase Authentication:** Firebase validates credentials and returns auth token or error
4. **Token Storage:** Auth token is stored in browser and used for subsequent requests
5. **Session Persistence:** Auth context monitors auth state with onAuthStateChanged
6. **Route Protection:** Protected routes check auth state before rendering
7. **Access Control:** Unauthenticated users redirected to login page
8. **Logout Process:** On logout, token is invalidated and user is redirected

## Error Handling

The application handles various authentication errors:

- Invalid credentials
- Account not found
- Email already exists
- Too many requests
- Weak password
- Invalid email

## Deployment

This project can be deployed to Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your Firebase environment variables in the Vercel project settings
4. Deploy!
