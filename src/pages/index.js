import ReposList from '@/components/ReposList';
import LoggedResults from '@/components/LoggedResults';
import React, { useState } from 'react';

export default function Home() {
    const [packageName, setPackageName] = useState('');
    const [packageVersion, setPackageVersion] = useState('');
    const [selectedRepos, setSelectedRepos] = useState([]);
    const [logs, setLogs] = useState([]); // State to hold logs
  
    const handlePackageChange = (e) => {
      setPackageName(e.target.value);
    };
  
    const handleVersionChange = (e) => {
      setPackageVersion(e.target.value);
    };
  
    const handleButtonClick = async () => {
      const selectedRepos = getSelectedRepos(); // You'll need to implement this function to retrieve the selected repositories
  
      try {
        const response = await fetch('/api/runScript', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            packageName: packageName,
            packageVersion: packageVersion,
            selectedRepos: selectedRepos
          })
        });
  
        const result = await response.json();
        setLogs(result.data);
      } catch (error) {
        console.error('Failed to run the script:', error);
      }
    };

    // Placeholder for getSelectedRepos function
    const getSelectedRepos = () => {
        return selectedRepos;
      };

      const handleRepoSelection = (repo, isSelected) => {
        if (isSelected) {
          setSelectedRepos(prev => [...prev, repo]);
        } else {
          setSelectedRepos(prev => prev.filter(r => r !== repo));
        }
      };
      
      
    
      return (
        <div className="notionStyle">
          <h1>Upgrade Packages</h1>
          <div className="inputGroup">
            <label htmlFor="package">Package</label>
            <input 
              type="text" 
              id="package" 
              placeholder="Enter package name" 
              value={packageName}
              onChange={handlePackageChange} 
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="version">Package Version</label>
            <input 
              type="text" 
              id="version" 
              placeholder="Enter package version" 
              value={packageVersion}
              onChange={handleVersionChange}
            />
          </div>
          <ReposList onRepoSelection={handleRepoSelection} />
          <button className="upgradeBtn" onClick={handleButtonClick}>Upgrade</button>
          <LoggedResults results={logs} /> 
        </div>
      );
}

