# About this Project

Melody Miner focuses on creating a user-friendly music discovery application that integrates Firebase for authentication and Firestore for data storage, alongside the Spotify API for fetching and recommending tracks. Here is a comprehensive overview of the project's development:

## User Onboarding and Authentication:
 - The initial phase involved setting up the user interface for onboarding, including stack screens for the Welcome, SignIn, and SignUp pages.
 - The Welcome page features navigation buttons for SignIn and SignUp.
 - The SignUp page includes text inputs for user details and a button to navigate to the home page, with Firebase Auth used for email-based user creation and validation.
 - The SignIn page allows users to log in with their existing accounts, verifying credentials via Firebase Auth and handling potential errors.
 - An option for Google Sign-In was implemented, using OAuth to retrieve user tokens, create Google credential objects, and sign in users through Firebase.
## State Management and Navigation:
 - The app tracks user state changes using a function onAuthStateChanged, which updates the user state based on authentication events.
 - useEffect hooks manage authentication state observers and handle cleanup when components unmount.
 - The app dynamically renders screens based on user authentication status, showing different content to signed-in users.
## Firestore Integration:
- User data, such as display names and saved songs, is stored in Firestore.
- Each user document is identified by a unique UID, ensuring each user has a distinct record.
- Firestore also handles data storage for users who sign in via Google.
## Home Screen and User-Specific Pages:
 - The Home screen welcomes users with their display names fetched from Firestore.
 - A FlatList displays potential artists for discovery, with a timed function suggesting artists periodically.
 - Users can navigate to the Input Page via a button.
## Track Input and Spotify API Integration:
 - The Input Page allows users to enter track names and artist names through dynamically added TrackInput components.
 - Users can add or remove track inputs and submit their entries to get music recommendations.
 - The Spotify API is used to retrieve access tokens and search for tracks, returning results that are parsed for track IDs and displayed on the results page.
## Recommendations and Results:
 - The Results page renders recommendations based on user input, fetched using the Spotify API.
 - Each recommendation is a component with links to Spotify and a like button.
 - Recommendations are displayed with a loading spinner until all data is fetched and parsed.
## Saving and Managing User Favorites:
 - Firestore stores users' saved songs, updated when users like or remove tracks.
 - The Recommendation component updates the UI to reflect liked songs and allows users to remove tracks from their saved list.
 - The Profile page displays saved songs, fetched from Firestore, and allows users to remove songs using a handleDelete function that updates the saved songs array.

Summary: Melody Miner leverages Firebase for robust authentication and user data management, integrates the Spotify API for comprehensive music discovery and recommendation, and offers a seamless user experience through intuitive UI design and efficient state management.

# Setup and Installation

## Step 1: Clone the Repository:

git clone https://github.com/your-repo/melody-miner.git
cd melody-miner
