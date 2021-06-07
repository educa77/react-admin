/* eslint-disable no-unused-vars */
import * as React from "react";
import {
  Admin,
  Resource,
  /* EditGuesser */ ListGuesser,
  fetchUtils,
} from "react-admin";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import simpleRestProvider from "ra-data-simple-rest";
import { UserList, UserEdit } from "./users";
import { RoleList, RoleCreate } from "./roles";
import { PostList, PostEdit, PostCreate } from "./posts";
import { CategoriesList, CategoryEdit, CategoryCreate } from "./categories";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import customRoutes from "./customRoutes";
import login from "./components/login";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      customRoutes={customRoutes}
      loginPage={login}
    >
      <Resource name="users" list={UserList} edit={UserEdit} icon={UserIcon} />
      <Resource
        name="roles"
        list={RoleList}
        /* edit={UserEdit} */
        create={RoleCreate}
        icon={AccessibilityIcon}
      />
      <Resource
        name="categories"
        list={CategoriesList}
        edit={CategoryEdit}
        create={CategoryCreate}
      />
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
      />
    </Admin>
  );
};

export default App;
