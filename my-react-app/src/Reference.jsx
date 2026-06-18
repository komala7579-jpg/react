import{useRef} from "react"
function Refer(){
    const inputRef=useRef();
    const uber =()=>{
        inputRef.current.focus();
    };
    return(
        <div><label>Enter your name</label>
        <input ref={inputRef}  type="text"/>
       < button onDoubleClick={uber}>Submit</button>
        </div>
    );

}
export default Refer;