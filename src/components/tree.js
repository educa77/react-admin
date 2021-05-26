/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import SortableTree, {
  insertNode,
  changeNodeAtPath,
  removeNodeAtPath,
} from "react-sortable-tree";
import { useHistory } from "react-router";
import "react-sortable-tree/style.css";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import dataFake from "./data";
import utils from "./utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./tree.css";

const maxDepth = 3;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 150,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const apiUrl = "http://localhost:8080/api";

function tree(props) {
  // console.log(props, "props");
  const [controlledCategories, setControlledCategories] = useState([]);
  const [board, setBoard] = useState([]);
  const [boardTwo, setBoardTwo] = useState([]);

  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [path, setPath] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const btn = document.querySelector("#btnsave");
  const divCircular = document.querySelector(".circular");

  const dataFetch = async () => {
    const url = `${apiUrl}/categories`;
    const data = await axios.get(url);
    console.log(data, "data");
    setControlledCategories(data.data.rows);
    //setControlledCategories(dataFake);
  };
  console.log(controlledCategories, "controlledCategories");
  console.log(board, "board");
  console.log(divCircular, "divCircular");

  const spinner = () => {
    // btn.className = "spin";
    btn.disabled = true;
    divCircular.style.display = "flex";
    window.setTimeout(function () {
      divCircular.style.display = "none";
      btn.className = "";
      btn.disabled = false;
    }, 12000);
  };

  const sortData = () => {
    utils.dataSorting(controlledCategories);
    setBoard(controlledCategories.filter((e) => e.category_id === null));
    /* seteo esta nueva data en controlledCategories solo con los elementos de primer nivel ya que estos contienen a los del subnivel */
  };

  const sortFinalData = () => {
    utils.finalDataSorting({ board, controlledCategories });
    setBoardTwo(board);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useEffect(() => {
    sortData();
  }, [controlledCategories]);

  useEffect(() => {
    sortFinalData();
  }, [board]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAddCategory("");
    setOpen(false);
  };

  const onInputchange = (event) => {
    setAddCategory(event.target.value);
  };

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const addOrEditNode = () => {
    if (path && path !== "") {
      const treeData = changeNodeAtPath({
        treeData: boardTwo,
        newNode: ({ node }) => ({ ...node, title: addCategory }),
        path,
        getNodeKey,
      });
      setBoardTwo(treeData);
      setAddCategory("");
      setPath("");
    } else {
      const newAddNode = {
        title: addCategory,
        order: boardTwo?.length,
        category_id: null,
        expanded: false,
        id: new Date().getTime(),
        children: [],
      };
      const newTree = insertNode({
        treeData: boardTwo,
        newNode: newAddNode,
        depth: 0,
        getNodeKey,
        /*       minimumTreeIndex, */
      });
      setBoardTwo(newTree.treeData);
      setAddCategory("");
    }
  };

  const handleDelete = (rowInfo) => {
    const { path } = rowInfo;
    const newTree = removeNodeAtPath({
      treeData: boardTwo,
      path,
      getNodeKey,
    });
    setBoardTwo(newTree);
  };

  const handleEdit = (rowInfo) => {
    const { path, node } = rowInfo;
    setAddCategory(node.title);
    setPath(path);
    setOpen(true);
  };

  const handleTreeOnChange = (newtreeData) => {
    utils.settingOrderNCategory(newtreeData);
    setBoardTwo(newtreeData);
  };

  const handleModalSubmit = () => {
    if (addCategory !== "") {
      addOrEditNode();
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const duplicados = utils.flatData(boardTwo);
    //const duplicados = dataFake;
    const url = `${apiUrl}/categories`;
    let bandera = true;
    if (duplicados) {
      try {
        spinner();
        await axios.delete(url);
      } catch (err) {
        console.log(err.message);
        bandera = false;
      }
    }
    if (bandera) {
      for (const entry of duplicados) {
        try {
          await axios.put(`${url}/tree`, {
            id: entry.id,
            title: entry.title,
            order: entry.order,
            category_id: entry.category_id,
            expanded: entry.expanded,
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    }
    history.push(`/categories`);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/categories`);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <LabelModal>Ingrese el nombre de la categoria a agregar:</LabelModal>
      <FormModal>
        <ModalInput type="text" value={addCategory} onChange={onInputchange} />
        <ButtonSave onClick={handleModalSubmit}>Submit</ButtonSave>
      </FormModal>
    </div>
  );

  return (
    <div className="wrapper">
      <div className="bar-wrapper">
        <label style={{ fontWeight: "600" }}>
          <button
            className="btn btn-outline-success"
            style={{
              verticalAlign: "middle",
              background: "#008657",
              color: "white",
              height: "2rem",
            }}
            onClick={handleOpen}
          >
            Agregar una categoria
          </button>
        </label>
      </div>
      <div className="tree-wrapper">
        {boardTwo && boardTwo.length > 0 && (
          <SortableTree
            treeData={boardTwo}
            onChange={handleTreeOnChange}
            onMoveNode={({ node, treeIndex, path }) =>
              console.debug(
                "node:",
                node,
                "treeIndex:",
                treeIndex,
                "path:",
                path
              )
            }
            maxDepth={maxDepth}
            canDrag={({ node }) => !node.noDragging}
            canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
            isVirtualized={false}
            generateNodeProps={(rowInfo) => ({
              buttons: [
                <button
                  className="btn btn-outline-success"
                  style={{
                    verticalAlign: "middle",
                    marginRight: "0.5rem",
                  }}
                  onClick={() => {
                    handleEdit(rowInfo);
                  }}
                >
                  <EditIcon style={{ fontSize: "small" }} />
                </button>,
                <button
                  className="btn btn-outline-success"
                  style={{
                    verticalAlign: "middle",
                  }}
                  onClick={() => {
                    handleDelete(rowInfo);
                  }}
                >
                  <DeleteIcon
                    style={{
                      fontSize: "small",
                      color: "red",
                    }}
                  />
                </button>,
              ],
            })}
          />
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
      <ButtonBox>
        <ButtonSave onClick={handleSubmit} id="btnsave">
          Guardar
          <div className="circular">
            <CircularProgress size="1.2rem" color="white" />
          </div>
        </ButtonSave>
        <ButtonCancel onClick={handleCancel}>Cancelar</ButtonCancel>
      </ButtonBox>
    </div>
  );
}

export default tree;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3rem;
`;

const ButtonSave = styled(Button)`
  display: flex;
  align-items: center;
  background: #008657;
  color: white;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: #f7931d;
    color: #000;
  }
`;

const ButtonCancel = styled(Button)`
  background: red;
  color: white;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: #f7931d;
    color: #000;
  }
`;

const FormModal = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LabelModal = styled.div`
  padding-bottom: 1.5rem;
`;

const ModalInput = styled.input`
  margin-bottom: 1.5rem;
  line-height: 1.5rem;
  font-size: 1.2rem;
`;
