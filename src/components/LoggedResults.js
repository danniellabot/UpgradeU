import React from 'react'

const LoggedResults = ({ results }) => {
    return (
      <div className="resultsContainer">
        <div className="header">
          <h2>PR Links</h2>
        </div>
        <div className="resultsList">
          {results.map((result, index) => (
            <div key={index} className="resultItem">
              <span className="repoName">{result.repo}</span>
              {result.prLink ? (
                <a
                  href={result.prLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prLink"
                >
                  View Pull Request
                </a>
              ) : (
                <span className="errorText">{result.error}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default LoggedResults;