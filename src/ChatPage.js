import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SendIcon from "@material-ui/icons/Send";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { useLocation, useHistory } from "react-router-dom";

const ENDPOINT = "https://chat12api.herokuapp.com/";
let socket;

export default function ChatPage() {
  const location = useLocation();
  const history = useHistory();

  const [messages, setMessage] = useState([]);
  const [userDetails, setUserdetils] = useState({
    groupid: "",
    name: "",
  });

  const sendMessage = (values, actions) => {
    socket.emit("sendMessage", values.message, () => {
      actions.resetForm();
    });
  };

  useEffect(() => {
    const chekdata = !!location.state;
    if (chekdata) {
      const { username, groupid } = location.state;
      socket = io(ENDPOINT);
      socket.emit("join", { name: username, room: groupid }, ({ error }) => {
        alert(error);
        history.push("/Loginpage");
      });
      setUserdetils(location.state);
    } else {
      history.push("/Loginpage");
    }
  }, [ENDPOINT]);

  useEffect(() => {
    const chekdata = !!location.state;
    if (chekdata) {
      socket.on("message", (message) => {
        setMessage((messages) => [...messages, message]);
      });
    }
  }, [ENDPOINT]);

  const LoginSchema = Yup.object().shape({
    message: Yup.string()
      .required()
      .matches(/(?!^ +$)^.+$/),
  });

  return (
    <Grid container justify="center" alignItems="center" className="h-100 ">
      <Grid item md={6} xs={12}>
        <Paper className="p-5 shadow-lg">
          <div className="text-center text-dark border-bottom pb-2">
            <h3> {userDetails.groupid}</h3>
          </div>
          <div className=" p-3 " style={{ height: "400px" }}>
            {messages.length === 0 ? (
              <>
                <div className="spinnercontainer">
                  <div class="spinner spin-1"></div>
                  <div class="spinner spin-2"></div>
                  <div class="spinner spin-3"></div>
                </div>
              </>
            ) : (
              <>
                <ScrollToBottom className="h-100 ">
                  {messages.map((item) =>
                    item.user === userDetails.username ? (
                      <>
                        <div className="w-75 float-end my-2">
                          <div
                            className="rounded float-end p-2 shadow-sm border-custom  "
                            style={{
                              display: "inline-block",
                              wordBreak: "break-all",
                            }}
                          >
                            {item.text}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-75 my-2 float-start">
                          <div
                            className="float-start rounded p-2 shadow-sm border-custom "
                            style={{
                              display: "inline-block",
                              wordBreak: "break-all",
                            }}
                          >
                            {item.text}
                            <br />
                            <span className="text-muted">{item.user}</span>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </ScrollToBottom>
              </>
            )}
          </div>
          <Formik
            initialValues={{ message: "" }}
            onSubmit={sendMessage}
            validationSchema={LoginSchema}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form autoComplete="off" className="row mt-3">
                <div className="form-group col-10">
                  <TextField
                    label="Type a Message"
                    type="text"
                    name="message"
                    value={values.message}
                    className="w-100"
                    placeholder="Enter Message"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-2 p-0">
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    style={{ border: "2px solid" }}
                    className="rounded-pill  my-3"
                  >
                    <SendIcon />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
}
