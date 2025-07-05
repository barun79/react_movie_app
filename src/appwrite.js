import {Client, Databases, ID, Query} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)


const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    console.log("Updating search count for:", searchTerm, movie.title);
    
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    console.log("Found docs:", result.documents.length);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      console.log("Updating existing doc:", doc.$id);

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      console.log("Creating new document");
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        original_language: movie.original_language,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      });
    }

    console.log("Document successfully created/updated!");
  } catch (error) {
    console.error("Appwrite error:", error.message || error);
  }
};


export const getTrendingMovies = async() => {
    try {   
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;
    } catch (error) {
        console.error(error);
    }
}
