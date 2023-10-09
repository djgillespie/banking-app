function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [deposit, setDeposit] = React.useState('');
    let balance = currentUser.balance;
    const sharedContext = window.sharedContext || {};
    const updateBalance = sharedContext.updateBalance || (() => {});
    const UserContext = sharedContext.UserContext || React.createContext();


    const handleDeposit = () => {
        const newBalance = balance + parseInt(deposit);
        updateBalance(newBalance);
        setStatus("Deposit complete");
        sharedContext.balance = newBalance;
        
    }
    React.useEffect(() => {
        sharedContext.updateBalance = updateBalance;
    }, [updateBalance, sharedContext]);


    return (
        <Card 
            bgcolor="success"
            header="Deposit"
            title="Balance"
            status={status}
            body={show ? (
                <>
                {balance && <h3>{balance}</h3> }
                <h6>Deposit Amount:</h6> 
                <input type="input" className="form-control" id="deposit" placeholder="Enter amount" value={deposit} onChange={(e) => setDeposit(e.currentTarget.value)} /> <br />
                <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
                </>
            ):(
               <></> 
            )}
        />
    );
}