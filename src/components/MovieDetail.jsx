const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetail = ({ movie, onClose }) => {
  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    original_language,
    vote_average,
    vote_count,
  } = movie;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center overflow-y-auto px-4 py-8">
      <div className="relative max-w-4xl w-full bg-dark-100 rounded-lg shadow-xl p-6 text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-white"
        >
          ✕
        </button>

        {backdrop_path && (
          <img
            src={`${BACKDROP_BASE_URL}${backdrop_path}`}
            alt="Backdrop"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {poster_path && (
            <img
              src={`${IMAGE_BASE_URL}${poster_path}`}
              alt={title}
              className="w-full md:w-64 h-auto rounded-lg shadow-lg"
            />
          )}

          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm text-gray-200 italic">{release_date}</p>
            <p className="text-base text-gray-100">{overview}</p>

            <div className="mt-4 text-sm space-y-1">
              <p>
                <p><strong>Language:</strong> {original_language ? original_language.toUpperCase() : "N/A"}</p>
              </p>
              <p>
                <strong>Rating:</strong> {vote_average} ⭐ ({vote_count} votes)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
