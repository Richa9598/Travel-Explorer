import React, { useState } from 'react';

// type for searing item
type SearchProps = {
  filterTasks: (name: string) => void;
};

//creating a variable to handle search using props which is of tye SearchProps
const Search = (props: SearchProps) => {

  //variable to hold searchTerm and it's state variable which acts as a function
  const [searchTerm, setSearchTerm] = useState('');


  //methof to handle key strok changes 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    props.filterTasks(e.target.value);
  };

  //return a UI for search bar
  return (
    <div className='filter-search'>
      Filter :
      <input
        type='text'
        placeholder='search'
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;