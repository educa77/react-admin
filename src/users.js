import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField /* UrlField */,
  ReferenceInput,
  ReferenceField,
  SelectInput,
  SimpleForm,
  TextInput,
  Create,
  Edit,
} from "react-admin";

const UserTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <EmailField source="email" />
        {/* <TextField source="password" /> */}
        <ReferenceField source="role_id" reference="roles">
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="email" />
      <TextField source="password" />
      <ReferenceInput source="role_id" reference="roles">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextField source="role" />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="email" />
      <TextField source="password" />
      <ReferenceInput source="role_id" reference="roles">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
