function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState(true);
    const auth = firebase.auth();
    const db = firebase.database();
    const id = auth.currentUser.uid;
    var currentBalance = getCurrentBalance();

    function getCurrentBalance() {
        db.ref('users/' + id + '/balance').once("value", snap => {
            currentBalance = parseInt(snap.val());
            console.log(snap.val())
        })
    }
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
    
    function DepositMessage(props) {
        return (
          <>
            <span className="balance-information">Account Balance ${currentBalance}.00</span>
            <br />
            <button type="submit" className="btn btn-light" onClick={() => {props.setShow(true); props.setStatus('');}}>Deposit</button>
          </>
        );
    }

    function DepositForm () {
        const [deposit, setDeposit] = React.useState('');
        function validate(deposit) {
            if (isNaN(deposit)) {
              setStatus("Did not enter a valid number");
              setTimeout(() => setStatus(''), 3000);
              return false;
            }
            if (deposit < 1) {
              setStatus("Did not enter a valid number");
              setTimeout(() => setStatus(''), 3000);
              return false;
            }
            return true;
        }

        function handleDeposit() {
            if (!validate(Number(deposit))) return;

            var newBalance = (currentBalance + parseInt(deposit));
            currentBalance = newBalance;
            setStatus("Deposit complete");
            setShow(false); 

            pushUserBalance(currentBalance);
            // push new balance to db
            function pushUserBalance() {
                db.ref('/users/' + id + '/balance').set(currentBalance);
                setStatus("Deposit complete");
                //setShow(false);
            }
        }
        return (
            <>
            {currentBalance &&<h3>${currentBalance}.00</h3> }
            <h6>Deposit Amount:</h6> 
            <input type="input" className="form-control" id="deposit" placeholder="Enter amount" value={deposit} onChange={(e) => setDeposit(e.currentTarget.value)} /> <br />
            <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
        </>
        );
    }
}