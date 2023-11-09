function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [user, setUser] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    // get elements
    const navCreateAccount = document.getElementById('navCreateAccount');
    const navLogin = document.getElementById('navLogin');
    const navDeposit = document.getElementById('navDeposit');
    const navWithdraw = document.getElementById('navWithdraw');
    const navBalance = document.getElementById('navBalance');
    
     
    return (
        <Card 
            bgcolor="info"
            header="Login"
            status={status}
            body={
                show ? 
                <LoginForm setUser={setUser} setShow={setShow} setStatus={setStatus}/> 
                 : 
                <LoginMsg setShow={setShow} setStatus={setStatus}/>
            
            } 
        />
    );

    function LoginForm(){
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        var db = firebase.database();

        const handleLogin = (e) => {
            e.preventDefault();
            if (!validate(email, 'email')) return;
            if (!validate(password, 'password')) return;
            // add login
            const auth = firebase.auth();
            authenticate();
            
            async function authenticate () {
                let response = await auth.signInWithEmailAndPassword(email, password);
                return response; 
            }
            authenticate().then((result) => {
                console.log(result);
                    setSuccess(true);
                    setShow(false);
                    setUser(result.user.email);
                    console.log(user);
                    return user;
                })
                // .then(function() {
                //     console.log(user);
                //     get(user);
                // })
                .catch(function(error) {
                    var error_message = error.message;
                    setSuccess(false);
                    setShow(false);
                    console.log(error_message);
                })
           
            
            function get(user) {
                var userId = result.user.uid;
                setUser(db.ref('/users/' + userId + '/name').once('value'));
                console.log(user);
                return user;
            }
            
        }
        return (
            <form onSubmit={handleLogin}>
                Email Address <br/>
                <input type="email" 
                className="form-control" 
                placeholder="Enter email"
                value={email} 
                onChange={e => setEmail(e.currentTarget.value)} /><br/>

                Password <br/>
                <input type="password" 
                className="form-control" 
                placeholder="Enter password"
                value={password} 
                onChange={e => setPassword(e.currentTarget.value)} /><br/>
            
                <button type="submit" 
                className="btn btn-light">Login</button>
            </form>
        );
    }
        
    function validate(field, label) {
        if (!field) {
            setStatus('Error: Must include ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }
    function LoginMsg(props){
        return success ? (
            <>
                <h5>Signed in as {user}</h5>
                <a href="#/balance/">
                    <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>View Balance</button>
                </a>
            </>
        ) : (
            <>
                <h6>Invalid Credentials</h6> 
                <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Try Again</button><br/><br/>
                <h6>Don't have an account?</h6>
                <a href="#/createaccount/">
                    <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Create Account</button>
                </a>
            </>
        );
    }
}

