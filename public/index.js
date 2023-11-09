function Spa(){
    const user_data = React.useState([]);
    const db = firebase.database();
    const auth = firebase.auth();
    const userData = null;
    var authUser = false;
    
    document.addEventListener("DOMContentLoaded", function() {
        auth.onAuthStateChanged(user =>{
            if (user) {
                const userId = user.uid;
                const userRef = db.ref('users/' + userId);
                authUser = true;

                userRef.on('value', (snapshot) => {
                    userData = snapshot.val();
                    console.log(userData);
                    if (userData) {
                        const userName = userData.name;
                        console.log(userName);
                        const userInfoElement = document.getElementById("login-status");
                        userInfoElement.innerHTML = `Signed in as ${userName} <button onClick="userSignOut()">Sign Out</button>`;
                    }
                    return userData;
                });
            } else {
                const userInfoElement = document.getElementById('login-status');
                userInfoElement.innerHTML = "You are not signed in";
            }
        });
    });
    const userSignOut = () => {
        return signOut(auth).then(() => {
            console.log('signed out')
        }).catch(error => console.log(error))
    }
    return( 
        <HashRouter>
            <div>
            <NavBar />
            <div className="login-status" id="login-status">
            {authUser ? <><p>{`Signed in as ${userData.email}`}</p><button onClick={userSignOut}>Sign Out</button></> : <><p>You are not signed in</p></>}
            </div>
            <UserContext.Provider value={userData}>
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