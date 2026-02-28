import { Fragment, useState } from "react";
import { users } from "../../static.json";

export default function UsersList() {
  const [userIndex, setUserIndex] = useState(0);
  const user = users[userIndex];

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
