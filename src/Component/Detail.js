import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { updateArr } from './store/Slice';
import { IoHome } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
//import './Detail.scss';

export const Detail = () => {
  const state = useSelector((samp) => samp.data);
  console.log(state);
  let dis = useDispatch();
  const { id } = useParams();
  console.log(id);

  const prod = state.arr.find((item) => item.id === parseInt(id));

  if (!prod) {
    return <div>Product not found</div>;
  }

  const add = (i) => {
    let a = state.arr.map((v, index) => {
      return v.id === i ? { ...v, isadd: true } : v;
    });
    dis(updateArr(a));
  };

  const fav = (i) => {
    let b = state.arr.map((v, index) => {
      return i === v.id ? { ...v, isfav: !v.isfav } : v;
    });
    dis(updateArr(b));
  };

  const plus = (i) => {
    console.log("plus");
    let c = state.arr.map((v, ind) => {
      if (v.id === i) {
        if (v.count < 10) {
          return { ...v, count: v.count + 1 };
        } else {
          alert("You have exceeded the limit!!!!");
          return v;
        }
      } else {
        return v;
      }
    });
    dis(updateArr(c));
  };

  const minus = (i) => {
    console.log("minus");

    let d = state.arr.map((v, ind) => {
      if (v.id === i) {
        if (v.count > 1) {
          return { ...v, count: v.count - 1 };
        } else {
          return { ...v, isadd: false };
        }
      } else {
        return v;
      }
    });
    dis(updateArr(d));
  };

  const drop = (i) => {
    console.log("drop");

    let f = state.arr.map((v, ind) => {
      return v.id === i ? { ...v, isSelect: !v.isSelect } : v;
    });
    dis(updateArr(f));
  };

  const handleSelect = (val, i, ind) => {
    let g = state.arr.map((m, n) => {
      return i === m.id
        ? {
            ...m,
            kg: val.kg,
            price: val.price,
            isSelect: false,
            weight: m.weight.map((x, y) =>
              ind === y ? { ...x, isActive: true } : { ...x, isActive: false }
            ),
          }
        : m;
    });
    dis(updateArr(g));
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/">
          <IoHome />
        </Link>
        <h1 className="navbar-brand" style={{color:"#4CAF50"}}>DETAILED DELIGHTS</h1>
        <Link to="/fav">
          <IoHeartOutline />
        </Link>
      </nav>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img src={prod.image} alt={prod.tname} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <p className="text-muted" style={{ fontSize: "25px" }}>
              Fresho
            </p>
            <hr />
            <h1>{prod.fname}</h1>
            <h3 style={{color:"violet"}}>{prod.tname}</h3>
            <h4 style={{color:"#4CAF50"}}>Price: {prod.price}</h4>

            <div className="dropdown mt-3" style={{backgroundColor : "#f57777",width:"80px",borderRadius:"5px",textAlign:"center"}} >
              <p className="cursor-pointer" onClick={() => drop(prod.id)}>
                {prod.kg}
              </p>
              {prod.isSelect && (
                <div className="dropdown-options" style={{backgroundColor:"#f4f4f4"}}>
                  {prod.weight.map((value, index) => (
                    <p
                      key={index}
                      className="dropOpen"
                      onClick={() => handleSelect(value, prod.id, index)}
                    >
                      {value.kg}
                      {/* <span>{value.price}</span> */}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="d-flex mt-3">
              <div className="d-flex font-size-3em" style={{fontSize:"30px"}} onClick={() => fav(prod.id)}>
                {prod.isfav ? <FcLike /> : <IoHeartOutline  />}
              </div>

              {prod.isadd ? (
                <div className="ml-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => minus(prod.id, prod.count)}
                  >
                    -
                  </button>
                  <p className="text-center">{prod.count}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => plus(prod.id)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary ml-3" onClick={() => add(prod.id)}>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





