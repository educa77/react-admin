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
  ListButton,
  TopToolbar,
  ShowButton,
  CreateButton,
  FilterButton,
  ExportButton,
} from "react-admin";

const CategoryTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const CategoryEditActions = ({ basePath, record, resource }) => (
  <TopToolbar>
    <ListButton basePath="/tree" label="Tree" />
    <ShowButton basePath={basePath} record={record} />
    <CreateButton basePath={basePath} />
    <ExportButton />
  </TopToolbar>
);

export const CategoriesList = (props) => {
  return (
    <List
      {...props}
      actions={<CategoryEditActions />}
      /* pagination={<CategoryPagination />} */
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        {/*  <TextField source="order" />
        <TextField source="expanded" /> */}
        <ReferenceField source="category_id" reference="categories">
          <TextField source="title" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const CategoryEdit = (props) => (
  <Edit title={<CategoryTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextField source="order" />
      <TextField source="expanded" />
      <ReferenceInput source="category_id" reference="categories">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextField source="order" />
      <TextField source="expanded" />
      <ReferenceInput source="category_id" reference="categories">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
