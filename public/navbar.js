function NavBar(){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#" title="Home">
                <img src="bank.png" width="20" height="20"/>  Bank</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#/createAccount/" id="createAccount" title="Create a new account">Create Account</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/login/" id="login" title="Log in to your account">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/deposit/" title="Make a deposit">Deposit</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/withdraw/" title="Make a withdrawal">Withdraw</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/balance/" title="View your current balance">Balance</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/alldata/" title="All stored data">All Data</a>
                    </li>          
                </ul>
            </div>
        </nav>
        </>
    );
}