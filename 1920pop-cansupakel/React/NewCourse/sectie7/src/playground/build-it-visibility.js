class Visibility extends React.Component{
    constructor(props){
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            show: true
        }
    }

    handleToggleVisibility(){
        console.log('test');
        this.setState((prevState)=>{
            return{
                show: !prevState.show 
            };
        });
    }

    render(){
        return(
            <div>
                <h1>Toggle</h1>
                <button onClick={this.handleToggleVisibility}>{this.state.show ? "Hide details": "Toon details"}</button>
                {this.state.show && <p>details</p>}
            </div>
        )
    }
}


ReactDOM.render(<Visibility/>, document.getElementById('app'));




/**const app = {
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


template();*/