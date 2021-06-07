import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Create,
  SimpleForm,
} from "react-admin";

export const RoleList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const RoleCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput multiline source="name" />
    </SimpleForm>
  </Create>
);
