import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:8080/api";
const httpClient = fetchUtils.fetchJson;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: async (resource, params) => {
    console.log("entro a list");
    if (resource === "categories") {
      let { page: pagina, perPage: size } = params.pagination;
      pagina = pagina - 1;
      const url = `${apiUrl}/${resource}?page=${pagina}&size=${size}`;
      const { headers, json } = await httpClient(url);
      return {
        data: json.categories,
        total: headers.get("content-range")
          ? parseInt(headers.get("content-range").split("/").pop(), 10)
          : json.totalItems,
      };
    } else {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      const { headers, json } = await httpClient(url);
      return {
        data: json,
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    }
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: async (resource, params) => {
    console.log("entro a getmany");
    if (resource === "categories") {
      const id = params.ids[0];
      const url = `${apiUrl}/${resource}/${id}`;
      const { json } = await httpClient(url);
      let dataArr = [];
      dataArr.push(json);
      return { data: dataArr };
    }
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: [...json] };
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },

  update: (resource, params) => {
    console.log("entro a update");
    console.log(params, "params");
    if (resource === "categories") {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      }).then(({ json }) => {
        console.log(json, "json de update");
        return { data: params.data };
      });
    } else {
      httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }
  },

  updateMany: (resource, params) => {
    console.log("entro a updateMany");
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: async (resource, params) => {
    if (resource === "categories") {
      const dataCreate = {
        ...params.data,
        id: new Date().getTime(),
        expanded: params.data.expanded ? params.data.expanded : false,
        order: params.data.order ? params.data.order : null,
        category_id: params.data.category_id ? params.data.category_id : null,
      };
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(dataCreate),
      }).then(
        ({ json }) => {
          const data = {
            data: {
              ...params.data,
              id: json.id,
              expanded: json.expanded,
              order: json.order,
              category_id: json.category_id,
            },
          };
          return data;
        },
        (error) => {
          console.log(error, "error");
        }
      );
    } else {
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }));
    }
  },

  delete: (resource, params) => {
    console.log("entro a delete");
    if (resource === "categories") {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "DELETE",
      }).then(({ json }) => {
        return json ? { data: json } : { data: {} };
      });
    } else {
      httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "DELETE",
      }).then(({ json }) => ({ data: json }));
    }
  },

  deleteMany: async (resource, params) => {
    if (resource === "categories") {
      params.ids.forEach((id) => {
        if (params.ids.indexOf(id) === params.ids.length - 1) {
          return httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE",
          }).then(({ json }) => {
            return json ? { data: json } : { data: [id] };
          });
        }
        return httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
        }).then(({ json }) => {
          return json ? { data: json } : { data: [id] };
        });
      });
    } else {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
        method: "DELETE",
      }).then(({ json }) => ({ data: json }));
    }
  },
};
