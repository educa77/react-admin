import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField /* UrlField */,
} from "react-admin";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);
