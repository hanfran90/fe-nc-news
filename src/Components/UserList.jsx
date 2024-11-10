import Loading from "./Loading";
import UserCard from "./UserCard";
import { getUsers } from "../api";
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className="user-container">
      {users.map((user) => {
        return <UserCard user={user} key={user.username} />;
      })}
    </ul>
  );
}

export default UserList;
