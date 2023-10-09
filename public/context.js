const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext();
const DisplayContext = React.createContext();

const currentUser = {
    name: 'abel',
    email: 'abel@mit.edu',
    password: 'secret',
    balance: 100
};
const balance = currentUser.balance;
const updateBalance = () => {};
const sharedContext = {
    users: [{name:"abel", email:"abel@mit.edu", password:"secret", balance:100},{name:"Jane Doe", email:"jane@me.com", password:"Access123", balance:100}, {name:"Peter Parker", email:"peter@mit.edu", password:"Passcode321", balance:100}, {name: "John Smith", email:"john@msn.com", password:"Letmein33", balance:100}],
    setUsers: () => {},
    UserContext: UserContext,
    balance: balance,
    updateBalance: updateBalance
}
// window.UserContext = UserContext;
// window.balance = balance;
// window.updateBalance = updateBalance;
// window.sharedContext = sharedContext;

function App() {
    const [users, setUsers]  = useState([currentUser]);
    sharedContext.users = users;
    sharedContext.setUsers = setUsers;

    return (
        <UserContext.Provider value={sharedContext}>
            {children}
        </UserContext.Provider>
    )
}

function Card(props){
    function classes(){
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    return (
        <UserContext.Consumer>
            {() => (
            <div className={classes()} style={{maxWidth: "35rem", margin: "auto"}}>
                <img src="pillars_top.png" className="card-img-top"></img>
                <div className="card-header">{props.header}</div>
                <div className="card-body">
                    {props.title && (<h5 className="card-title">{props.title}</h5>)}
                    {props.text && (<p className="card-text">{props.text}</p>)}
                    {props.body}
                    {props.status && (<div id="createStatus">{props.status}</div>)}
                </div>
            </div>
            )}
        </UserContext.Consumer>
    )
}

