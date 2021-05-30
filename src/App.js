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
import simpleRestProvider from "ra-data-simple-rest";
import { UserList } from "./users";
import { PostList, PostEdit, PostCreate } from "./posts";
import { CategoriesList, CategoryEdit, CategoryCreate } from "./categories";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import customRoutes from "./customRoutes";
import login from "./components/login";

// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => {
  /*   const httpClient = (url, options = {}) => {
    const newUrl = url.split("?", 1);
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    const { token } = JSON.parse(localStorage.getItem("auth"));
    options.headers.set("x-access-token", `${token}`);
    //options.headers.set("Content-Range");
    return fetchUtils.fetchJson(newUrl.toString(), options);
  };
  const dataProvider = simpleRestProvider(
    "http://localhost:8080/api",
    httpClient
  ); */

  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      customRoutes={customRoutes}
      loginPage={login}
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
