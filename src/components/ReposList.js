import React from 'react';
import repos from '../data/repos.json'; // Adjust the relative path as necessary

const ReposList = (props) => {
  const handleCheckboxChange = (repoName) => (event) => {
    const isSelected = event.target.checked;
    props.onRepoSelection(repoName, isSelected);
  };

  return (
    <div className="reposContainer">
     <div className="header">
          <h2>Select Repositories</h2>
        </div>
      {repos.map(repo => (
        <div key={repo.id} className="repoItem">
          <input 
            type="checkbox" 
            id={repo.id} 
            onChange={handleCheckboxChange(repo.name)} 
          />
          <label htmlFor={repo.id}>{repo.name}</label>
        </div>
      ))}
    </div>
  );
}

export default ReposList;
