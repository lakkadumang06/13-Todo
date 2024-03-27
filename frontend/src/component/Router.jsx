import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Form from "../page/formpage/form";
import todo from "../page/todopage/Todo";
import Protected from "./Protected ";
import AddForm from "./Addform";
const Router = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route
          path="/todo"
          element={<Protected Component={todo } />}/>
          <Route path="/addform" element={<Protected Component={AddForm} />}/>
      </Routes>

    </div>
  );
};

export default Router;
