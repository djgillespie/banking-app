function AllData(){
    const [users, setUsers] = React.useState('');
   
    React.useEffect(() => {
        fetch('/account/all')
        .then(response => response.json())
        .then(data => {
            console.log('data: ' + data);
            setUsers(JSON.stringify(data));
        });
    },[]);
        
    
    console.log('users: ' + users);
    
    return (
        <>
            <h3>All User Data</h3> 
            {users}
        </>
    )
    
}