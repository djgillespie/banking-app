
function CreateAccount(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    // const [name, setName] = React.useState('');
    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
    const [errors, setError] = React.useState({nameError:'', emailError:'', passwordError:''});
    //const values = React.useState({name:'', email:'', password:''});
    const ctx = React.useContext(UserContext);
    

    // function clearForm(){
    //     setName('');
    //     setEmail('');
    //     setPassword('');
    //     setShow(true);
    // }

    return (
        <Card 
            bgcolor="primary"
            header="Create Account"
            status={status}
            body={show ? 
                <CreateForm setShow={setShow}/> :
                <CreateMsg setShow={setShow}/>}
        />
    )

    function CreateMsg(props){
        return(<>
            <h5>Account successfully created</h5>
                <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>Add another Account</button>
        </>);
    }

    function CreateForm(props){
        const [name, setName] = React.useState('');
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const ctx = React.useContext(UserContext);

        function validate(field, label) {
            if (!field) {
                setStatus('Error: Must include ' + label);
                setTimeout(() => setStatus(''),3000);
                return false;
            }
            return true;
        }
        
        function handleCreate() {
            if (!validate(name, 'name')) return;
            if (!validate(email, 'email')) return;
            if (!validate(password, 'password')) return;
            ctx.users.push({name,email,password,balance:100});
            props.setShow(false);
        }

        return (<>
            Name <br/>
                <input type="input" 
                className="form-control" 
                placeholder="Enter name"
                value={name} 
                onChange={e => setName(e.currentTarget.value)} /><br/>

                Email Address <br/>
                <input type="input" 
                className="form-control" 
                placeholder="Enter email"
                value={email} 
                onChange={e => setEmail(e.currentTarget.value)} /><br/>

                Password <br/>
                <input type="input" 
                className="form-control" 
                placeholder="Enter password"
                value={password} 
                onChange={e => setPassword(e.currentTarget.value)} /><br/>
                
                <button type="submit" 
                className="btn btn-light" 
                onClick={handleCreate}>Create Account</button>
        </>)
    }
}