import { useEffect, useState } from "react";
import { User } from "./User";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function UsersList({ user, setUser }) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  // const [userIndex, setUserIndex] = useState(0);
  // const user = users?.[userIndex];

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((users) => {
        setUser(users[0]);
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setUser]);

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
    <div>
      <ul className="users items-list-nav">
        {users.map((userItem) => (
          <li
            key={userItem.id}
            className={userItem.id === user?.id ? "selected" : undefined}
          >
            <button className="btn" onClick={() => setUser(userItem)}>
              {userItem.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
