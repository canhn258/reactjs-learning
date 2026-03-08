import { useState } from "react";
import UsersList from "./UsersList";
import UserDetail from "./UserDetail";

export default function UsersPage() {
  const [user, setUser] = useState();

  return (
    <main className="users-page">
      <UsersList user={user} setUser={setUser} />
      <UserDetail user={user} />
    </main>
  );
}
