

function Spa(){

    return(
        
        <HashRouter>
            <div>
            <NavBar />
            <UserContext.Provider value={currentUser}>
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