
function Spa(){
    const [authUser, setAuthUser] = React.useState(null);
        React.useEffect(() => {
            const auth = firebase.auth();
            const listen = auth.onAuthStateChanged(auth, (user) =>{
                if (user) {
                    setAuthUser(user);
                } else {
                    setAuthUser(null);
                }
            });
            return () => {
                listen();
            }
        }, []);
    

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('signed out')
        }).catch(error => console.log(error))
    }
    
    return( 
        <HashRouter>
            <div>
            <NavBar />
            <div className="login-status">
                {authUser ? <><p>{`Signed in as ${authUser.email}`}</p><button onClick={userSignOut}>Sign Out</button></> : <><p>You are not signed in</p></>}
            </div>
            <UserContext.Provider value={{name:'',email:'',password:'',balance:0}}>
              <div className="container" style={{padding: "70px"}}>
                <Route path="/" exact component={Home} />
                <Route path="/CreateAccount/"  component={CreateAccount} />
                <Route path="/login/"  component={Login} />
                <Route path="/deposit/"  component={Deposit} />
                <Route path="/withdraw/"  component={Withdraw} />
                <Route path="/balance/"  component={Balance} />
                <Route path="/alldata/"  component={AllData} />
                </div>
            </UserContext.Provider>
            
            </div>
        </HashRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Spa />);