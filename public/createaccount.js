
function CreateAccount(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    // handle on firebase db
    const db = firebase.database().ref('users');

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
                <button className="btn btn-light" onClick={() => props.setShow(true)}>Add another Account</button >
        </>);
    }

    function CreateForm(props){
        const [name, setName] = React.useState('');
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

        const getValue = (id) => {
            return document.getElementById(id).value;
        }
        

        //document.getElementById("createForm").addEventListener("submit", handleCreate());
        
        const handleCreate = (e) => {
            e.preventDefault();

            if (!validate(name, 'name')) return;
            if (!validate(email, 'email')) return;
            if (!validate(password, 'password')) return;

            
            
            const saveUser = (name, email, password) => {
                var newForm = db.push();
            
                newForm.set({
                    name: name,
                    email: email,
                    password: password,
                    balance: 100
                })
            }
            setName(getValue('name'));
            setEmail(getValue('email'));
            setPassword(getValue('password'));
            saveUser(name, email, password);

            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(email,password);
            promise.then(() => {
                const url = `/account/create/${name}/${email}/${password}`;
                (async () => {
                    var res = await fetch(url);
                    var data = await res.json();
                    console.log(data);
                })();
            })
            promise.catch((e) => console.log(e.message));
            props.setShow(false);
        }

        return (
            <form id="createForm" onSubmit={handleCreate}>
                Name <br/>
                <input type="input" 
                id="name"
                className="form-control" 
                placeholder="Enter name"
                value={name} 
                onChange={e => setName(e.currentTarget.value)} /><br/>

                Email Address <br/>
                <input type="input" 
                id="email"
                className="form-control" 
                placeholder="Enter email"
                value={email} 
                onChange={e => setEmail(e.currentTarget.value)} /><br/>

                Password <br/>
                <input type="password" 
                id="password"
                className="form-control" 
                placeholder="Enter password"
                value={password} 
                onChange={e => setPassword(e.currentTarget.value)} /><br/>
                
                <button type="submit" 
                className="btn btn-light">Sign up</button>
                </form>
        )
    }
}