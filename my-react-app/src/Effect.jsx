import{useEffect} from 'react'
function Data(){
    useEffect(()=>{
        console.log('useEffect');
    },[]
);
    return (
        <h1>good morning</h1>
    )
}
export default Data;