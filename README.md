# 🎬 My Movie Recommendation App

Live Demo 👉 [mymovierecommendation.netlify.app](https://mymovierecomendation.netlify.app/)

A sleek and responsive movie discovery web app that helps users find trending, popular, and search-based movie recommendations with ease. Powered by [TMDB API](https://developer.themoviedb.org/) and built with modern web technologies.

---

## 📦 Tech Stack

- **React** (Frontend UI library)
- **Tailwind CSS** (Utility-first CSS framework)
- **Appwrite** (Backend as a service - used for search tracking & storage)
- **TMDB API** (To fetch movies and trending data)
- **Netlify** (Deployment platform)

---

## ✨ Features Implemented

✅ **Search Movies**  
🔎 Type in the search box to get instant movie recommendations from TMDB.

✅ **Trending Section**  
🔥 Displays the most trending movies dynamically using Appwrite data or TMDB.

✅ **Detailed Movie View**  
🎥 Click on any movie to see a full-screen modal with a large poster, description, release info, and ratings.

✅ **Responsive Design**  
📱 Looks great on mobile, tablet, and desktop devices.

✅ **Debounced Search**  
🚀 Optimized search using a debounce mechanism to reduce API calls.

✅ **Search Analytics**  
📊 Tracks the most searched movies using Appwrite backend.

✅ **Clean UI/UX**  
🎨 Custom layout with smooth visuals using Tailwind CSS and gradients.

---

## 🧠 How It Works

- On load, the app fetches **trending movies** from the Appwrite backend or TMDB API.
- Users can **search** for any movie title via the search input.
- On every search, the app:
  1. Fetches results from the TMDB API
  2. Displays results instantly
  3. Updates search count in Appwrite (for analytics)

- Clicking on any movie opens a **full-page modal** showing:
  - Poster image
  - Backdrop
  - Description
  - Release Date
  - Language
  - Rating & Vote count

---

## 🧪 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/react-movie-app.git

# 2. Navigate to project folder
cd react-movie-app

# 3. Install dependencies
npm install

# 4. Create a .env file
touch .env

In your .env file, add:
VITE_TMDB_API_KEY=your_tmdb_bearer_token_here

Then:
# 5. Run locally
npm run dev