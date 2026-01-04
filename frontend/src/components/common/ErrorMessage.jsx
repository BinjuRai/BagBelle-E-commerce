const ErrorMessage = ({ title = "Error", message, onRetry }) => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2 text-red-600 dark:text-red-400">
          {title}
        </h2>
        <p className="text-red-700 dark:text-red-300 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;