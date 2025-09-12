const Pagination = ( ) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mt-6 text-sm text-gray-400 gap-3">
      <span className="text-xs sm:text-sm">Showing 0 to 0 of 365 entries</span>
      <div className="flex gap-8 sm:gap-6 flex-wrap justify-center sm:justify-end mt-5 items-center">
        <button className="hover:text-white text-sm sm:text-sm ">First</button>
        <button className="hover:text-white text-sm sm:text-sm">Previous</button>
        <button className="hover:text-white text-sm sm:text-sm">Next</button>
        <button className="hover:text-white text-sm sm:text-sm">Last</button>
      </div>
    </div>
  );
};

export default Pagination;
