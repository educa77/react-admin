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
  Pagination,
  useListContext,
} from "react-admin";

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

export const CategoriesList = (props) => {
  return (
    <List
      {...props}
      filters={<PostFilter />}
      /* pagination={<CategoryPagination />} */
    >
      <Datagrid /* rowClick="edit" */>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="order" />
        <TextField source="expanded" />
        <ReferenceField source="category_id" reference="categories">
          <TextField source="title" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};

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
