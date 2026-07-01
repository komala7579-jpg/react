import {useState , useEffect} from "react";
import axios from "axios";
function API()
{
    const [user , setuser]=useState([]);
    const[loading ,setloading]=useState(true);
    const [error , seterror]=useState("");
    useEffect(
        ()=>{
            axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((Response)=>{
                setuser(Response.data);
                setloading(false);
            })
            .catch((err)=>
            {
                seterror("Failure");
                setloading(false);
            }
            );
        },[]
    );
    if(loading)
    {
        return (
            <h2>Loading....</h2>
        );
    }
    if (error)
    {
        return (
            <h2>Error....</h2>
        );
    }
    return (
        <>
        <div className="container">
            <h1>User Details</h1>
            <table border={"1"}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );

}
export default API;