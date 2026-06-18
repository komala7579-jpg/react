import  UserContext from"./Context.js";
import Receive from"./Receive.jsx";
function Variant()
{
    return(
        <UserContext.Provider value="Komala">
            <Receive></Receive>

            </UserContext.Provider>
    );

}
export default Variant;
