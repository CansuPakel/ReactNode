console.log("test");

const jsxObject={
  'title':'This is JSX',
 // 'subtitle':'This is some info',
  'options':[]
};

function checkExist(options){
  if(options.length > 0){
    return 'You have options' ;
  }else{
    return 'You don\' t have options';
  }
}

const onFormSubmit =(e)=>{
  e.preventDefault(); //stop refresh page
  const option = e.target.elements.option.value; //get inputvalue
  if(option){
    jsxObject.options.push(option);
    e.target.elements.option.value = '';
  }
  renderApp();
}

const reset = (e) =>{
  jsxObject.options = [];
  renderApp();
}

// 0 to 0.99 Math.random()
// 0 to 1.99 Math.random() * jsxObject.options.length
//0 to 1 Math.floor( Math.random()* jsxObject.options.length);
const onMakeDecision = () =>{
  const randomNum = Math.floor( Math.random()* jsxObject.options.length);
  const option = jsxObject.options[randomNum];
  alert(option);
}

const appRoot = document.getElementById('app');


//Challenge render
const renderApp = () =>{
  const template= (
    <div>
      <h1>{jsxObject.title}</h1> 
      {jsxObject.subtitle && <p>{jsxObject.subtitle}</p>}
      {checkExist(jsxObject.options)}

      <button disabled={jsxObject.options.length === 0} onClick={onMakeDecision}>What should I do</button>
      <ol>
        {
        jsxObject.options.map((option) => <li key={option}>Option: {option}</li>)
        }
      </ol>

      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Add option</button>
        <button onClick={reset}>reset</button> 
      </form>
    </div>
  );

  ReactDOM.render(template,appRoot);
}
renderApp();



/** 
 * CHALLENGE
const user = {
  name:'Test',
  age:21,
  location:'Gent'
};

function getLocation(location){
  if(location){
    return <p>Location: {location}</p>    ;
  }
}

const oefening = (
  <div>
    <h1>{user.name ? user.name.toUpperCase() : "Anonymous" }</h1>
   {( user.age && user.age >= 18) &&<p>Age: {user.age}</p>  }
    {getLocation(user.location)}
  </div>
)
*/