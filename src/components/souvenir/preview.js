import Dialog from "@mui/material/Dialog";

export default function Preview(props) {
  const { open, setOpen, souvenir, frame } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "100vw!important",
          min: "10px!important",
          background: "transparent",
        },
      }}
    >
      <div className="previewPage">
        <img src={souvenir} alt="Souvenir" />
        <img src={frame} alt="frame" />
        <button onClick={handleClose}>X</button>
      </div>
    </Dialog>
  );
}
