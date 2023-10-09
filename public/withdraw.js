function Withdraw(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [withdraw, setWithdraw] = React.useState('');
    let balance = currentUser.balance;
    const sharedContext = window.sharedContext || {};
    const updateBalance = sharedContext.updateBalance || (() => {});


    const handleWithdrawal = () => {
        const newBalance = balance - parseInt(withdraw);
        updateBalance(newBalance);
        setStatus("Withdrawal complete");
        sharedContext.balance = newBalance;
        
    }
    React.useEffect(() => {
        sharedContext.updateBalance = updateBalance;
    }, [updateBalance, sharedContext]);


    return (
        <Card 
            bgcolor="danger"
            header="Withdraw"
            title="Balance"
            status={status}
            body={show ? (
                <>
                {balance && <h3>{balance}</h3> }
                <h6>Withdraw Amount:</h6> 
                <input type="input" className="form-control" id="withdraw" placeholder="Enter amount" value={withdraw} onChange={(e) => setWithdraw(e.currentTarget.value)} /> <br />
                <button type="submit" className="btn btn-light" onClick={handleWithdrawal}>Withdraw</button>
                </>
            ):(
               <></> 
            )}
        />
    );
}