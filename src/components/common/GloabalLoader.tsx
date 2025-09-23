const GlobalLoader = () => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999] px-4"
      aria-live="assertive"
      role="status"
    >
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin border-t-4" />
      <p className="mt-6 text-white text-lg font-semibold animate-pulse">
        Authenticating...
      </p>
    </div>
  );
};

export default GlobalLoader;
