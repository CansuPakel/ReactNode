const app = {
    title:'Visibility Toggle',
    details:'Hey these are details',
    show:false
};
const appRoot = document.getElementById('app');

const toggle=()=>{
    app.show = !app.show;
    template();
};


const template = () =>{
   const jsx =( 
       <div>
        <h1>dfd</h1>
        <button onClick={toggle}>{app.show ? 'Hide detals': 'Show details'}</button>
        {app.show &&(<p>{app.details}</p>)}
        </div>
   );
    ReactDOM.render(jsx,appRoot);
};


template();