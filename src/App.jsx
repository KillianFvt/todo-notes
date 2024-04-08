import './App.css';
import {Header} from "./components/Header";
import {NoteListPage} from "./pages/NoteListPage";
import {NotePage} from "./pages/NotePage";
import {
    BrowserRouter as Router,
    Route, Routes
} from "react-router-dom";
import {AddNotePage} from "./pages/AddNotePage";
import {RegisterPage} from "./pages/RegisterPage";
import {LogoutPage} from "./pages/LogoutPage";
import {LoginPage} from "./pages/LoginPage";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" exact element={<NoteListPage/>} />
                <Route path="/notes" exact element={<NoteListPage/>}/>
                <Route path="/note/:id" exact element={<NotePage/>}/>
                <Route path="/notes/add" exact element={<AddNotePage/>}/>
                <Route path="/note/add" exact element={<AddNotePage/>}/>
                <Route path="/account/register" exact element={<RegisterPage/>}/>
                <Route path="/account/login" exact element={<LoginPage/>}/>
                <Route path="/account/logout" exact element={<LogoutPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
