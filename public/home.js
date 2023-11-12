function Home(){
    return (
        <Card 
            bgcolor="light"
            txtcolor="black"
            header="Homepage"
            title="Welcome to the bank"
            text="(Un)Trustworthy source for your banking needs"
            body={(<img src="bank.png" className="img-fluid" alt="Responsive image" />)}
        />
    );
}