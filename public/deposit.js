var currentBalance;
function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
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
        })
        setLoading(true);
     },[loading])

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

            currentBalance = parseInt(currentBalance) + parseInt(deposit);
            fetch(`/account/update/${email}/+${Number(deposit)}`)
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
            setStatus("Deposit complete");
            setShow(false); 

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

    function DepositMessage(props) {
        return (
          <>
            <span className="balance-information">Account Balance ${currentBalance}.00</span>
            <br />
            <button type="submit" className="btn btn-light" onClick={() => {props.setShow(true); props.setStatus('');}}>Deposit</button>
          </>
        );
    }
}