function App() {
  const name = "Birds";
  const num1 = 78;
  const num2 = 90;
  const add = num1 + num2;
  let age=18;
  let userage=20;
  const warn=()=>{
    alert("warning⚠️");
  };
  return (
    <div>
      <h1 style={{ color: "blue" }}>page for {name}</h1>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <img src="https://media.istockphoto.com/id/183412466/photo/eastern-bluebirds-male-and-female.jpg?s=1024x1024&w=is&k=20&c=QxJ4bc7qqm0g2WdWGyvwAFYKHwiVj93TXK-50Usz5Vk=" alt="Birds" style={{ maxWidth: "200px", height: "auto" }} />
        <div>
          <h1 className="Birds">sum of two numbers: {add}</h1>
          <p>welcome</p>
           {(userage>age)? (<p>user loggedin</p>) : (<p>invalid</p>)}
          <button onClick={warn}>denger</button>
        </div>
      </div>
    </div>
  );
}

export default App;