function AllData(){
    const {users, balance} = React.useContext(UserContext);
    return (
        <>
        <h4>All Data</h4>
        <br />
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{balance}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}