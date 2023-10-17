import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteMovieList, getMovieList } from "../../services/Services";
import { useDispatch, useSelector } from "react-redux";
import { changeMovies } from "../../redux/slices/movieSlice";

export default function MovieList() {
  const data = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    getMovieList()
      .then((res) => {
        dispatch(changeMovies(res.data));
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete = (id) => {
    deleteMovieList(id)
      .then(() => {
        alert("Movie deleted succesfully");
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "Movies",
      headerName: "Movies",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink
              to={{ pathname: "/movies/" + params.row._id }}
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

  return (
    <div className="productList">
      <DataGrid
        rows={data.movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
