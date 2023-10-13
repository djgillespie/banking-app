function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [user, setUser] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const ctx = React.useContext(UserContext);
    
    return (
        <Card 
            bgcolor="info"
            header="Login"
            status={status}
            body={show ? 
                <LoginForm setUser ={setUser} setShow={setShow} setStatus = {setStatus}/> :
                <LoginMsg setShow={setShow} setStatus ={setStatus}/>}
        />
    );

    function LoginForm(){
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');

        function validate(field, label) {
            if (!field) {
                setStatus('Error: Must include ' + label);
                setTimeout(() => setStatus(''),3000);
                return false;
            }
            return true;
        }
        return (<>
            Email Address <br/>
            <input type="input" 
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
            className="btn btn-light" 
            onClick={handleLogin}>Login</button>
        </>);
    }
        
        function handleLogin() {
            if (!validate(email, 'email')) return;
            if (!validate(password, 'password')) return;
            // add login
            const auth  = firebase.auth();		
            const promise = auth.signInWithEmailAndPassword(
                email,
                password
              );
              firebase.auth().onAuthStateChanged((firebaseUser) => {
                if (firebaseUser) {
                  console.log(firebaseUser);
                  console.log(email, password);
                  fetch(`/account/login/${email}/${password}`)
                  .then(response => response.text())
                  .then(text => {
                    try{
                      const data = JSON.parse(text);
                      setShow(false);
                      setUser(data.name);
                      setSuccess(true);
                      ctx.user = data.name;
                      ctx.email = data.email;
                    } catch {
                      setSuccess(false);
                      setShow(false);
                    }
                  });
                } else {
                  setStatus("Unauthorized Username. Please create an account.");   
                  setTimeout(() => setStatus(""), 3000);
                }
              });
              promise.catch((e) => {
                console.log(e.message)});       
            
        }
    function LoginMsg(props){
        return success ? (<>
            <h5>Hello, {user}</h5>
            <a href="#/balance/">
                <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>View Balance</button>
            </a>
        </>) : (
            <>
            <h6>Invalid Credentials</h6> 
            <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Try Again</button><br/><br/>
            <h6>Not registered? </h6>
            <a href="#/createaccount/">
                <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Create Account</button>
            </a>
            </>
        );
    }
}
