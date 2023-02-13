const Subscription = ({ setView }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Select a Subscription Plan</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h1>Silver Plan</h1>
          <h3>1000 certificates</h3>
          <h3>Email Integration</h3>
          <button onClick={() => setView(1)}>Select</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h1>Gold Plan</h1>
          <h3>5000 certificates</h3>
          <h3>Email Integration</h3>
          <button onClick={() => setView(1)}>Select</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid white",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h1>Gold Plan</h1>
          <h3>Unlimited certificates</h3>
          <h3>Email Integration</h3>
          <button onClick={() => setView(1)}>Select</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
