import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import OpenFridge from './pages/OpenFridge.jsx';
import Recipes from './pages/Recipes.jsx';
import Header from './components/Header.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import { AuthProvider } from "./components/AuthContext.jsx";

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/" element={<Layout />} exact />
                    <Route path="/myfridge" element={<OpenFridge />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
