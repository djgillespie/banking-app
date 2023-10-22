function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [user, setUser] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const ctx = React.useContext(UserContext);
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
                show ? (
                <LoginForm setUser ={setUser} setShow={setShow} setStatus = {setStatus}/> 
                ) : (
                <LoginMsg setShow={setShow} setStatus ={setStatus}/>
            ) 
            } 
        />
    );

    function LoginForm(){
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [authUser, setAuthUser] = React.useState('');

        const handleLogin = (e) => {
            e.preventDefault();
            if (!validate(email, 'email')) return;
            if (!validate(password, 'password')) return;
            // add login
            const auth  = firebase.auth();		
            const promise = auth.signInWithEmailAndPassword(email,password)
              
         
        // React.useEffect(() => {
        //     const navCreateAccount    = document.getElementById('navCreateAccount');
        //     const navLogin            = document.getElementById('navLogin');
        //     const navDeposit          = document.getElementById('navDeposit');
        //     const navWithdraw         = document.getElementById('navWithdraw');
        //     const navBalance          = document.getElementById('navBalance');
        
        //     navCreateAccount.style.display  = "block";
        //     navLogin.style.display          = "block";
        //     navDeposit.style.display        = "none";
        //     navWithdraw.style.display       = "none";
        //     navBalance.style.display        = "none";
        // },[])

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                console.log(email, password);
                
                    try {
                        const data = JSON.parse(text);
                        setSuccess(true);
                        setAuthUser(data.name);
                        ctx.user = data.name;
                        ctx.email = data.email;
                        console.log(userCredential);
                  } catch {
                    setMessage(text);
                    setSuccess(false);
                    setShow(false);
                    }
               
                navLogin.style.display  = 'none';
                navCreateAccount.style.display = 'none';
                navDeposit.style.display = 'block';
                navWithdraw.style.display = 'block';
                navBalance.style.display = 'block';
                    
            } else {
                console.log("user is not logged in");
                navLogin.style.display  = 'block';
                navCreateAccount.style.display = 'block';
                navDeposit.style.display = 'none';
                navWithdraw.style.display = 'none';
                navBalance.style.display = 'none';
            }
       
            promise.catch((e) => {
                console.log(e.message)
            })    
         });
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
                <h5>Hello, {user}</h5>
                <a href="#/balance/">
                    <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>View Balance</button>
                </a>
            </>
        ) : (
            <>
                <h6>Invalid Credentials</h6> 
                <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Try Again</button><br/><br/>
                <h6>{message}</h6>
                <a href="#/createaccount/">
                    <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Create Account</button>
                </a>
            </>
        );
    }
}
