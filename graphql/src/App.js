import './App.css';
import { graphql } from "@octokit/graphql";
import { useState, useEffect } from "react";
const Token =process.env.REACT_APP_TOKEN
// console.log(Token)

const getRepository = async () => {
  const { repository } = await graphql(
    `{
      repository(name: "agora-states-fe", owner: "codestates-seb") {
        discussions(first: 10) {
          edges {
            node {
              id
              title
              createdAt
              url
              author {
                login
                avatarUrl
              }
              category {
                name
              }
              answer {
                author {
                  login
                }
              }
            }
          }
        }
      }
    }`,
    {
      headers: {
        authorization: `token ${Token}`,
      },
    }
  );
  return repository;
};

function App() {
  const [agoraData, setAgoraData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRepository()
      .then((res) => {
        setAgoraData(res.discussions.edges);
        setIsLoading(false);
      })
      .catch((error) => console.log(Error, error));
  }, []);

  return (
    <div className="App">
       {isLoading ? (
        <div>로딩중임</div>
      ) : (
        <ul>
          {agoraData.map((edge) => {
            return (
              <li key={edge.node.id}>
                <img
                  src={edge.node.author.avatarUrl}
                  alt={`avatar of ${edge.node.author.login}`}
                />
                <div>{`[${edge.node.category.name}]`}</div>
                <a href={edge.node.url}>{edge.node.title}</a>
                <p>{edge.node.answer ? "☑" : "☒"}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
