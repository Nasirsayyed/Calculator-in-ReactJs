import React, { useState } from "react";
import classes from "./Home.module.css";
// import Demo from './Demo'
import Button from "./Button";
function Home() {
  const [res, setRes] = useState("")

  const buttons = [
    "C",
    "9",
    "/",
    "8",
    "7",
    "6",
    "*",
    "5",
    "4",
    "3",
    "+",
    "2",
    "1",
    "0",
    "-",
    ".",
    "Del",
    "=",
  ];

  const findval = () => {
    let result = Function("return " +res)();
    setRes(result.toString());
  }

  const handler = (arg) => {
    if(res==="Infinity"||res==="NaN"){
      setRes("");
      return;
    }

    if (arg === "C") {
      setRes("");
    } else if (arg === "=") {
      findval();
    } else if (arg === "Del") {
      let n = res.length;
      if (n > 0) {
        setRes(res.slice(0, n - 1));
      }
    } else {
      setRes(res.concat(arg));
    }
  }
  return (
    <div>
      <div className={classes.home}>
        <div className={classes.inner}>
          <div className={classes.result}>
            <div className={classes.resBox}>
              {res} </div>
          </div>
          <div className={classes.btns}>
            {buttons.map((ele, index) => {
              return <Button handler={handler} value={ele} key={index} />;
            })}
          </div>
        </div>

        {/* <Demo/> */}
      </div>
    </div>
  );
}

export default Home;
