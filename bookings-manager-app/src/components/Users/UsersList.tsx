import { Fragment, useEffect, useState } from "react";
import { User } from "./User";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function UsersList() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [userIndex, setUserIndex] = useState(0);
  const user = users?.[userIndex];

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((user, index) => (
          <li
            key={user.id}
            className={index === userIndex ? "selected" : undefined}
          >
            <button className="btn" onClick={() => setUserIndex(index)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}
