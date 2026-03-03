import { useEffect, useState } from "react";
import { User } from "./User";
import Spinner from "../UI/Spinner";

export default function UserPicker() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data));
  }, []);

  if (users.length === 0) {
    return <Spinner />;
  }

  return (
    <select>
      {users.map((user) => (
        <option key={user.id}>{user.name}</option>
      ))}
    </select>
  );
}
