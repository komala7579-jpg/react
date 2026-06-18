import { useContext } from "react";
import UserContext from "./Context.js";
function Shero() {
  const Shinchan = useContext(UserContext);
  return (
  <h1>{Shinchan}</h1>
  );
}
export default Shero;