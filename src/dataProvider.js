import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:8080/api";
const httpClient = fetchUtils.fetchJson;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: async (resource, params) => {
    if (resource === "categories") {
      let { page: pagina, perPage: tamano } = params.pagination;
      pagina = pagina - 1;
      const url = `${apiUrl}/${resource}?page=${pagina}&size=${tamano}`;
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

  /* getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
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

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  }, */
};
