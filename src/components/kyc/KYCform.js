import KycScript from "./kycScript";

export const KYCform = (props) => {
  const {
    status,
    isuploading,
    name,
    setName,
    description,
    setdescription,
    website,
    setwebsite,
    email,
    setemail,
    contact,
    setcontact,
    regId,
    setregId,
    idProof,
    setidProof,
    handleSubmit,
  } = KycScript(props.setForm);

  return (
    <div className="individualpage">
      <div className="individualformcontainer">
        <h1>Enter Your KYC Details</h1>
        <label htmlFor="name">Name of the Company*</label>
        <input
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the Company"
        />
        <label htmlFor="name">Description</label>
        <input
          type="text"
          id="name"
          value={description}
          name="description"
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Name of the Company"
        />
        <label htmlFor="email">Official Website*</label>
        <input
          type="email"
          id="email"
          value={website}
          name="website"
          placeholder="Official Website"
          onChange={(e) => setwebsite(e.target.value)}
        />
        <label htmlFor="Official website">Official email ID*</label>
        <input
          type="text"
          id="phone_num"
          value={email}
          name="email"
          placeholder="Official email ID"
          onChange={(e) => setemail(e.target.value)}
        />
        <label htmlFor="website">Phone number*</label>
        <input
          type="text"
          id="website"
          name="phone"
          value={contact}
          placeholder="Phone number"
          onChange={(e) => setcontact(e.target.value)}
        />
        <label htmlFor="website">CIN*</label>
        <input
          type="text"
          id="website"
          name="CIN"
          value={regId}
          placeholder="CIN"
          onChange={(e) => setregId(e.target.value)}
        />
        <label htmlFor="fileselectorinput">
          ID proof of the representative*
        </label>
        {idProof.name}
        <input
          type="file"
          id="fileselectorinput"
          onChange={(e) => {
            setidProof(e.target.files[0]);
          }}
        />

        <div className="status">{status}</div>
        {isuploading ? (
          <button>Uploading...</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};
