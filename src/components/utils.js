/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-expressions */
import { getTreeFromFlatData, getFlatDataFromTree } from "react-sortable-tree";

const flatData = (boardTwo) => {
  var array = [];
  for (const entry of boardTwo) {
    array.push(entry);
    if (entry.children !== []) {
      for (const element of entry.children) {
        array.push(element);
        if (!element.category_id) {
          element.category_id = entry.id;
        }
        if (element.children !== []) {
          for (const item of element.children) {
            array.push(item);
            if (!item.category_id) {
              item.category_id = element.id;
            }
          }
        }
      }
    }
  }
  /* elimino las categorias duplicadas */
  const duplicados = array.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );
  return duplicados;
};

const dataSorting = (controlledCategories) => {
  /* genero, utilizando las categorias, la data como necesita el componente Board */
  for (const element of controlledCategories) {
    /* relleno el atributo cards con los elementos relacionados */
    element.children =
      element.category_id === null // si es null es del primer nivel
        ? [...controlledCategories.filter((e) => e.category_id === element.id)]
        : [];
    element.expanded = true;
  }
};

const finalDataSorting = ({ board, controlledCategories }) => {
  for (const element of board) {
    for (const entry of element.children) {
      for (const item of entry.children) {
        item.order ? item.order : item.children.indexOf(item);
      }
      /* relleno el atributo cards con los elementos relacionados */
      entry.children =
        [...controlledCategories.filter((e) => e.category_id === entry.id)] ||
        [];
      /* seteo el order en caso de no tener y hago genero un sort segun order */
      entry.order ? entry.order : element.children.indexOf(entry);
      entry.children.sort(function (a, b) {
        return a.order - b.order;
      });
    }
    element.order ? element.order : board.indexOf(element);
    element.children.sort(function (a, b) {
      return a.order - b.order;
    });
  }
  board.sort(function (a, b) {
    return a.order - b.order;
  });
};

const settingOrderNCategory = (newtreeData) => {
  for (const element of newtreeData) {
    for (const entry of element.children) {
      entry.order = element.children.indexOf(entry);
      entry.category_id = element.id;

      for (const item of entry.children) {
        item.order = entry.children.indexOf(item);
        item.category_id = entry.id;
      }
    }
    element.order = newtreeData.indexOf(element);
    element.category_id = null;
  }
};

/* helpers de sortabletree para transformar data plana a arbol y de arbol a data plana */

const getTree = (controlledCategories) => {
  return getTreeFromFlatData({
    flatData: controlledCategories,
    getKey: (node) => node.id,
    getParentKey: (node) => (node.category_id ? node.category_id : null),
    rootKey: null,
  });
};

const flatDataFromTree = (boardTwo) => {
  return getFlatDataFromTree({
    treeData: boardTwo,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false,
  });
};

export default {
  flatData,
  finalDataSorting,
  dataSorting,
  settingOrderNCategory,
  getTree,
  flatDataFromTree,
};
