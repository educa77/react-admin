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
  TopToolbar,
  ShowButton,
  CreateButton,
  ExportButton,
} from "react-admin";

const PostEditActions = ({ basePath, record, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={record} />
    <CreateButton basePath={basePath} />
    <ExportButton />
  </TopToolbar>
);

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
  <List {...props} filters={<PostFilter />} actions={<PostEditActions />}>
    <Datagrid /* rowClick="edit" */>
      <TextField source="id" />
      <TextField source="title" />
      <ReferenceField source="post_id" reference="posts">
        <TextField source="title" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <ReferenceInput source="post_id" reference="posts">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput multiline source="title" />
      <ReferenceInput source="post_id" reference="posts">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
