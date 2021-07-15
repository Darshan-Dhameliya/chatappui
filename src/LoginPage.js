import React, { useState } from "react";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const history = useHistory();
  const LoginData = (values) => {
    history.push({
      pathname: "/chatpage",
      state: values,
    });
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .matches(/^\S+$/, "Space Not allowed"),
    groupid: Yup.string()
      .required("Required")
      .matches(/^\S+$/, "Space Not allowed"),
  });

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="h-100 container"
    >
      <Grid item md={6} xs={12}>
        <Paper className="p-5 shadow-lg">
          <h2 className="text-center text-dark">Chat App</h2>
          <div className="text-center text-secondary">
            Please Enter Same Group Name Which Would You like To Join
          </div>
          <Formik
            initialValues={{ username: "", groupid: "" }}
            onSubmit={LoginData}
            validationSchema={LoginSchema}
          >
            {({ errors, touched, handleChange }) => (
              <Form autoComplete="off">
                <div className="form-group mt-3">
                  <TextField
                    error={touched.username && errors.username}
                    id="username"
                    label="Username"
                    name="username"
                    placeholder="Enter Username"
                    type="text"
                    onChange={handleChange}
                    className="w-100"
                    helperText={
                      touched.username && errors.username && errors.username
                    }
                  />
                </div>
                <div className="form-group my-4 position-relative">
                  <TextField
                    error={touched.groupid && errors.groupid}
                    label="Group Name"
                    type="text"
                    name="groupid"
                    className="w-100"
                    placeholder="Enter Group Name"
                    onChange={handleChange}
                    helperText={
                      touched.groupid && errors.groupid && errors.groupid
                    }
                  />
                </div>
                <div className="form-group text-center mt-3">
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    style={{ border: "2px solid" }}
                    className="rounded-pill px-5 my-3"
                  >
                    Go For Chat
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
