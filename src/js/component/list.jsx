import React, { useEffect, useState } from "react";

const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  
  useEffect(()=>{
    if(items.length > 0){
      fetch('https://assets.breatheco.de/apis/fake/todos/user/jeshuanarvaezcollado', {
      method: "PUT",
      body: JSON.stringify(items),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); 
        console.log(resp.status);
        console.log(resp.text()); 
        return resp.json; 
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.log(error);
    });}
    

  },[items])
  
  function addItem() {
    if (!inputValue) {
      alert("Can't be empty");
      return;
    }
    let aux = {label : inputValue, done : false }
    setItems((prevList) => [...prevList, aux]);
    setInputValue("");
  }
  function handleRemove(i) {      
    let temp = [...items]
    temp[i].done = !temp[i].done
    setItems(temp)
    
  }

  
  return (
    <div className="d-inline-flex flex-column w-75 container justify-content-center align-items-center shadows">
      <div className="row">
        <h1 className="col-12">To-Do List with Fetch!</h1>
      </div>

      <div className="row mt-7">
        <input
          className="col-8"
          size="40"
          type="text"
          placeholder="Add an item here!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="col-4" onClick={() => addItem()}>
          Add
        </button>
      </div>

      <ul id="list" className="list-group col-4 mt-5">
        {items.length == 0 ? 
          (<li className="list-group-item text-center"> Add a task!
          </li>)
         : 
          items.map((item, i) => (
            
              <li
                className="list-group-item text-center"
                id={i}
                key={i}
                onClick={(e)=>{
                  handleRemove(i)
                }}
              >
                {console.log(item.done)}
               <span className={item.done ?"text-decoration-line-through" : null}>{item.label}</span>
              </li>
            
          )
        )}
        <li className="list-group-item text-center text-black-50">{`${items.length} item left`}</li>
        <div className="fondo1"></div>
        <div className="fondo2"></div>
      </ul>
    </div>
  );
};

export default List;