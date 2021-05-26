/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Route } from "react-router";
import Tree from "./components/tree";

export default [<Route path="/tree" component={Tree} /* noLayout */ />];

/* <Route path="/forgot-password/:id" component={ForgotPassword} noLayout /> */
