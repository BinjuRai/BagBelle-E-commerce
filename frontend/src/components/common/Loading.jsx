const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
      <p className="text-muted-light dark:text-muted-dark">{message}</p>
    </div>
  );
};

export default Loading;