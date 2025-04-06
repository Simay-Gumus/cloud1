import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CategoryPage from "./pages/Categories.tsx";
import ItemPage from "./pages/ItemPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import AddItemPage from "./pages/AddItemPage.tsx";
import EditUsersPage from "./pages/editUsersPage.tsx";
import CreateUserPage from "./pages/CreateUserPage.tsx";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<MainPage/>} />
          <Route path="/login" element={<LoginPage/>} />
            <Route path="/:category" element={<CategoryPage/>} />
            <Route path="/item/:id" element={<ItemPage/>} />
          <Route path="/user/:username" element={<UserPage/>} />
          <Route path="/addItem" element={<AddItemPage/>} />
          <Route path="/editUsers" element={<EditUsersPage/>} />
          <Route path="/createUser" element={<CreateUserPage/>} />


          {/*
          <Route path="/:id" element={} />
          <Route path="/user/:id" element={} />
          <Route path="/edit-users" element={} />
          */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
