import './App.css';
import { graphql } from "@octokit/graphql";

async function App() {
  const token = process.env.REACT_APP_Token;
  const { repository } = await graphql(
    `
      {
        repository(owner: "octokit", name: "graphql.js") {
          issues(last: 3) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    `,
    {
      headers: {
        authorization: `token ${token}`,
      },
    }
  );


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
