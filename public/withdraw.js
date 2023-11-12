var currentBalance;
function Withdraw(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const auth = firebase.auth();
    
    const email = auth.currentUser.email;
    
    React.useEffect(() => {
       fetch(`/account/findOne/${email}`)
       .then(response => response.text())
       .then(text => {
        try {
            const data = JSON.parse(text);
            currentBalance = data.balance;
            console.log('JSON:', data)
        } catch (err) {
            console.log('err:', text)
        }
        return currentBalance;
       })
    },[])

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

            currentBalance = parseInt(currentBalance) - parseInt(withdraw);
            fetch(`/account/update/${email}/-${Number(withdraw)}`)
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setShow(false);
                    console.log('JSON:',data);
                } catch(err) {
                    console.log('err:', text);
                }
            });
            setStatus("Withdrawal complete");
            setShow(false);

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

    function WithdrawMessage(props) {
        return (
            <>
            <span className="balance-information">Account Balance ${currentBalance}.00</span>
            <br />
            <button type="submit" className="btn btn-light" onClick={() => {props.setShow(true); props.setStatus('');}}>Withdraw</button>
            </>
        );
    }
    
}