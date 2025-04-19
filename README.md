
# System Diagram Documentation

The `auth-flow-diagram.png` file in this directory illustrates the authentication flow of the application.

## Components

1. **User**: Represents the end-user interacting with the application through login/signup forms and Google authentication.
2. **Auth UI**: The login/signup forms, validation logic, and error handling components.
3. **Firebase API**: Firebase Authentication service that handles credential verification and token generation.
4. **Protected Routes**: Routes that require authentication, including the dashboard and user profile pages.

## Flows

### Authentication Flow
1. User enters credentials on Login/Signup page or uses Google authentication
2. Auth UI validates input and sends credentials to Firebase
3. Firebase validates credentials and returns auth token or error
4. Token is stored in browser and used for subsequent requests
5. Auth context monitors auth state with onAuthStateChanged
6. Protected routes check auth state before rendering
7. Unauthenticated users are redirected to login page
8. On logout, token is invalidated and user is redirected

### Token Validation Flow
- **Client**: Sends request with Firebase ID token in Authorization header
- **Firebase Auth**: Verifies token signature, expiration, and claims
- **Server**: Processes request if token is valid
- **Error Handler**: Returns 401/403 error if token is invalid or expired

See the diagram page at `/diagram` route for an interactive version.

## Credits

Designed and documented by John Doe
