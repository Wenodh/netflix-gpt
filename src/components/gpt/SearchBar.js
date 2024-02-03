import React from 'react';

const SearchBar = () => {
    return (
        <div className="pt-[90px] flex justify-center">
            <form className="w-1/2 grid grid-cols-12">
                <input
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder="What would you like to watch today?"
                />
                <button className="my-4 px-4 bg-red-500 col-span-3 rounded">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
