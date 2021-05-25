/* eslint-disable no-unused-vars */
import * as React from "react";
import { Admin, Resource, /* EditGuesser */ ListGuesser } from "react-admin";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./users";
import { PostList, PostEdit, PostCreate } from "./posts";
import { CategoriesList } from "./categories";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {/*     <Resource
      name="users"
      list={UserList}
      icon={UserIcon}
    />
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    /> */}
      <Resource name="categories" list={CategoriesList} />
    </Admin>
  );
};

export default App;
