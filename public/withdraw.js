function Withdraw(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [withdraw, setWithdraw] = React.useState('');
    const [balance, setBalance] = React.useState('');


    const handleWithdrawal = () => {
        const newBalance = balance - parseInt(withdraw);
        setBalance(newBalance);
        setStatus("Withdrawal complete");
        
    }
    // React.useEffect(() => {
    //     sharedContext.updateBalance = updateBalance;
    // }, [updateBalance, sharedContext]);


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