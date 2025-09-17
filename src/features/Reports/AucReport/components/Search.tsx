
const Search = () => {

  return (
    <div className="mb-6 p-[1px] w-full max-w-lg sm:max-w-xl lg:max-w-2xl rounded-md 
        bg-gradient-to-r from-[var(--purple-1)] to-[var(--purple-2)]"
    >
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-black rounded-md p-2 px-4 text-white focus:outline-none"
      />
    </div>
  );
};

export default Search;
