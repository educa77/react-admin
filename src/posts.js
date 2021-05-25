/* eslint-disable no-unused-vars */
import * as React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  Filter,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const PostList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid /* rowClick="edit" */>
      <TextField source="id" />
      <ReferenceField source="userId" reference="users">
        {/* <TextField source="id" /> */}
        <TextField source="name" />
      </ReferenceField>
      {/* <TextField source="id" /> */}
      <TextField source="title" />
      {/* <TextField source="body" /> */}
      <EditButton />
    </Datagrid>
  </List>
);

export const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="userId" reference="users">
        {/* <SelectInput optionText="id" /> */}
        <SelectInput optionText="name" />
      </ReferenceInput>
      {/* <TextInput source="id" /> */}
      <TextInput source="title" />
      {/* <TextInput source="body" /> */}
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Create>
);
