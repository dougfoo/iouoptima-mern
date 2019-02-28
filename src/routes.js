import React from "react";
import { Route } from "react-router-dom";

import LoanList from "./containers/LoanListView";
import LoanDetail from "./containers/LoanDetailView";
import CustomerList from "./containers/CustomerListView";
import CustomerDetail from "./containers/CustomerDetailView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={LoanList} />{" "}
    <Route exact path="/loans/" component={LoanList} />{" "}
    <Route exact path="/loans/:loanID/" component={LoanDetail} />{" "}
    <Route exact path="/customers/" component={CustomerList} />{" "}
    <Route exact path="/customers/:customerID/" component={CustomerDetail} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
  </div>
);

export default BaseRouter;
