import React, { forwardRef, useState } from "react";
import Base from "./Base";
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Dialog, Fab, Grid, IconButton, Paper, Slide,
  TextField, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ContactPhoneSharpIcon from "@mui/icons-material/ContactPhoneSharp";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import LanguageIcon from "@mui/icons-material/Language";
import { URL } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contact = ({contacts, setContacts}) => {
  const navigate = useNavigate();
  return (
    <Base title={"Contacts"}>
      <AddContact />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <div>
                <Grid container spacing={3}>
                  {contacts.map((contact) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={contact._id}>
                      <Card
                        key={contact._id}
                        sx={{ display: "flex", width: 200 }}
                      >
                        <CardActionArea
                          onClick={() =>
                            navigate(`/${contact._id}`)
                          }
                        >
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <CardContent sx={{ flex: "1 0 auto" }}>
                              <Typography
                                component="div"
                                variant="h6"
                                color="#00695f"
                              >
                                {contact.fullName}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                              >
                                {contact.mobile}
                              </Typography>
                            </CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                pl: 1,
                                pb: 1,
                              }}
                            >
                              {contact.pincode}
                            </Box>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Base>
  );
};

export default Contact;

// Add contact

function AddContact({ contacts, setContacts }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [map, setMap] = useState("");
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      let payload = {
      companyName,
      fullName,
      mobile,
      email,
      address,
      city,
      state,
      pincode,
      map,
      website
    }

      console.log(payload);

      const response = await axios.post(`${URL}/add`, payload,
      {headers: {
        "Content-Type": "application/json"}
    })

      if (response.status === 200) {

        setOpen(false);
        navigate('/');
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Fab variant="extended" 
      sx={{ mb: 3, background: "orange", position: "fixed", top: "5rem", right: "1rem", zIndex: 1000 }}
       onClick={handleClickOpen} >
        <AddIcon sx={{ mr: 1 }} />
        Add Contact
      </Fab>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#00695f" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Contact
            </Typography>
            <Button autoFocus color="inherit" onClick={handleAdd}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          component="form"
          noValidate
          onSubmit={handleAdd}
          encType="multipart/form-data"
          sx={{ mt: 1 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={10} lg={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Grid container spacing={3}>
                  <Grid item xs={10} md={9} lg={10}>
                    <Box sx={{ width: 800, maxWidth: "100%" }}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        id="fullWidth"
                        variant="standard"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Full Name"
                        id="fullWidth"
                        variant="standard"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={6} lg={6}>
                    <h5>Contact:</h5>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <ContactPhoneSharpIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        id="input-with-sx"
                        label="Mobile"
                        variant="standard"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <ContactMailIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        id="input-with-sx"
                        label="E-mail"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: 425,
                        maxWidth: "100%",
                      }}
                    >
                      <BusinessIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        fullWidth
                        label="Address"
                        id="fullWidth"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Box>
                    <TextField
                      sx={{ ml: 4 }}
                      id="standard-basic"
                      label="City"
                      variant="standard"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                      sx={{ ml: 4 }}
                      id="standard-basic"
                      label="State"
                      variant="standard"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <TextField
                      sx={{ ml: 4 }}
                      id="standard-basic"
                      label="Country"
                      defaultValue="India"
                      variant="standard"
                      disabled
                    />
                    <TextField
                      sx={{ ml: 4 }}
                      id="standard-basic"
                      label="Pincode"
                      variant="standard"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <h5>Links:-</h5>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <WorkIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        id="input-with-sx"
                        label="Map Link"
                        variant="standard"
                        value={map}
                        onChange={(e) => setMap(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <LanguageIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        id="input-with-sx"
                        label="Website"
                        variant="standard"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
