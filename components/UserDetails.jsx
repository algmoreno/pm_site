"use client"; 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  console.log(id)
  useEffect(() => {
    if (id) {
      axios.get(`/api/auth/users/${id}`)
        .then(res => setUser(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!user) return <div>Something went wrong...</div>;

  return (
    <div>
      <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
      <p>{user.email}</p>
      <p>{user.age}</p>
    </div>
  )
}


export default UserDetails