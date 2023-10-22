const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const DisplayContext = React.createContext();

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDYS5JB4tseN6tekSQlU38AazMnu5UdBkI",
    authDomain: "bank-app-861eb.firebaseapp.com",
    projectId: "bank-app-861eb",
    storageBucket: "bank-app-861eb.appspot.com",
    messagingSenderId: "65826269344",
    appId: "1:65826269344:web:3979e16d0a14e5fe0701c5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Card(props){
    
    function classes(){
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    return (
        <UserContext.Consumer>
            {() => (
            <div className={classes()} style={{maxWidth: "35rem", margin: "auto", border: "2px solid DarkGray"}}>
                <img src="pillars_top.png" className="card-img-top"></img>
                <div className="card-header"><h3>{props.header}</h3></div>
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

