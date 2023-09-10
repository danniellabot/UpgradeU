import { exec } from 'child_process';

const runShellScript = async (req, res) => {
  const { packageName, packageVersion, selectedRepos } = req.body;

  let results = [];

  const runScriptForRepo = (repo) => {
    return new Promise((resolve, reject) => {
      exec(`sh ./scripts/update_package.sh ${packageName} ${packageVersion} ${repo}`, (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
          resolve({ repo, error: 'Failed to run script' });
        } else if (stderr) {
          console.warn(stderr);
          resolve({ repo, error: `Script execution error: ${stderr}` });
        } else if (stdout) {
            console.log('Hej' , stdout);
          resolve({ repo, prLink: stdout.trim() });
        } else {
            console.log('Unknown error');
          resolve({ repo, error: 'Unknown error' });
        }
      });
    });
  };

  for (let repo of selectedRepos) {
    const result = await runScriptForRepo(repo);
    results.push(result);
  }

  return res.status(200).json({ data: results });
};

export default runShellScript
