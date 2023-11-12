function NavBar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#" title="Home">
                <img src="bank.png" width="20" height="20"/>  Bank</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#/createAccount/" id="navCreateAccount" title="Create a new account">Create Account</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/login/" id="navLogin" title="Log in to your account">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/deposit/" id="navDeposit" title="Make a deposit">Deposit</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/withdraw/" id="navWithdraw" title="Make a withdrawal">Withdraw</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/balance/" id="navBalance" title="View your current balance">Balance</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/alldata/" title="All stored data">All Data</a>
                    </li>          
                </ul>
            </div>
        </nav>
    );
}