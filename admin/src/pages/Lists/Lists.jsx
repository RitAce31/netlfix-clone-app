import "./lists.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteList, getList } from "../../services/Services";
import { useDispatch, useSelector } from "react-redux";
import { changeList } from "../../redux/slices/listSlice";

export default function Lists() {
  const data = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    deleteList(id)
      .then((res) => {
        alert(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink
              to={{ pathname: "/lists/" + params.row._id }}
              state={params.row}
            >
              <button className="productListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getList()
      .then((res) => {
        if (res.status === 200) {
          dispatch(changeList(res.data));
        }
      })
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <div className="productList">
      <DataGrid
        rows={data.lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
