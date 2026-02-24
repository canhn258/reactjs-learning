import { users } from "../../static.json";

export default function UserPicker() {
  return (
    <select name="user" id="user">
      <option value="">Users</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
