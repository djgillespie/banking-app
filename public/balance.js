var currentBalance;
function Balance() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const auth = firebase.auth();
    const email = auth.currentUser.email;

    function fetchBalance() {
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
            setShow(false);
        })
    }
    
    return(
        <Card 
            bgcolor="dark"
            header="Balance"
            status={status}
            body={show ? (
                 <BalanceSubmit setShow={setShow} />
            ) : (
                <BalanceView setShow={setShow} />
            )}
        />
    );

    function BalanceSubmit () {
        return (
            <button type="submit" className="btn btn-light" onClick={fetchBalance}>View Balance</button>
        );
    }

    function BalanceView () {
        return (
            <>
            <div>Account Balance: </div>
            {currentBalance && <h3>${currentBalance}.00</h3> }</>
        )
    }
}