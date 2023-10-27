function Withdraw(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [currentBalance, setCurrentBalance] = React.useState('');
    const ctx = React.useContext(UserContext);

    return (
        <Card 
            bgcolor="danger"
            header="Withdraw"
            title="Balance"
            status={status}
            body={show ? (
                <WithdrawForm setShow ={setShow} setStatus={setStatus} />
            ) : (
                <WithdrawMessage setShow={setShow} setStatus={setStatus} />
            )}
        />
    );
    function WithdrawMessage(props) {
        return (
            <>
              <span className="balance-information">Account Balance ${parseInt(currentBalance)}.00</span>
              <br />
              <button type="submit" className="btn btn-light" onClick={() => {props.setShow(true); props.setStatus('');}}>Withdraw</button>
            </>
        );
    }

    function WithdrawForm () {
        const [withdraw, setWithdraw] = React.useState('');
        function validate(withdraw) {
            if (isNaN(withdraw)) {
              setStatus("Did not enter a valid number");
              setTimeout(() => setStatus(''), 3000);
              return false;
            }
            if (withdraw < 1) {
              setStatus("Did not enter a valid number");
              setTimeout(() => setStatus(''), 3000);
              return false;
            }
            return true;
        }
    

        function handleWithdrawal() {
            if (!validate(Number(withdraw))) return;

            var newBalance = currentBalance - parseInt(withdraw);
            setCurrentBalance(newBalance);
            setStatus("Withdrawal complete");
            setShow(false);

            ctx.balance.toString();
            const url = `/account/withdraw/${ctx.email}/${ctx.balance}`;
            (async () => {
                var res = await fetch(url);
                var data = await res.json();
                console.log(data);
            })();
        }
            
        return (
            <>
            {currentBalance && <h3>${currentBalance}.00</h3> }
                <h6>Withdraw Amount:</h6> 
                <input type="input" className="form-control" id="withdraw" placeholder="Enter amount" value={withdraw} onChange={(e) => setWithdraw(e.currentTarget.value)} /> <br />
                <button type="submit" className="btn btn-light" onClick={handleWithdrawal}>Withdraw</button>
            </>
        );
        
    }
    
}