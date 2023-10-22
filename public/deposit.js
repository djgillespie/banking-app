function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [deposit, setDeposit] = React.useState('');
    const [user, setUser] = React.useState('');
    const [balance, setBalance] = React.useState(user.balance);

    return (
        <Card 
            bgcolor="success"
            header="Deposit"
            title="Balance"
            status={status}
            body={ show ? (
                <DepositForm setShow ={setShow} setStatus={setStatus} />
            ) : (
                 <DepositMessage setShow={setShow} setStatus={setStatus} />
            )}
        />
    )

    function DepositForm (props) {
        function handleDeposit() {
            if (!validate(Number(deposit))) return;

            fetch(`/account/update/${user.email}/${deposit}`)
                .then(response => response.text())
                .then(text => {
                    try {
                        const data = JSON.parse(text);
                        props.setStatus(JSON.stringify(data.amount));
                    } catch(err) {
                        props.setStatus('Deposit failed')
                        console.log('err:', text);
                    }
            });
            setBalance(balance + Number(deposit));
            setShow(false);
        }
        return (
            <>
            <h3>{balance}</h3> 
            <h6>Deposit Amount:</h6> 
            <input type="input" className="form-control" id="deposit" placeholder="Enter amount" value={deposit} onChange={(e) => setDeposit(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
        </>
        );
    }

    function DepositMessage(props) {
        return (
          <>
            <span className="balance-information">Account Balance ${balance}</span>
            <br />
            <h5>Deposit complete</h5>
            <button type="submit" className="btn btn-light" onClick={() => {props.setShow(true); props.setStatus('');}}>Deposit</button>
          </>
        );
    }

    function validate(deposit) {
        if (isNaN(deposit)) {
          setStatus("Did not enter a valid number");
          return false;
        }
        if (deposit < 1) {
          setStatus("Did not enter a valid number");
          return false;
        }
        return true;
    }
}