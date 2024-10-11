

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css';


import Guard, { CandidateGuard, EmailSentGuard, GuardVerificode, ProfileGuard } from "./guards/recover.guard";
import Index from "./pages/Admin/Index";
import Register from './pages/Register/Register';
import Dashboard from "./pages/dashboard/Dashboard";
import FormProfile from "./pages/dashboard/Perfil/Profile";
import Voting from "./pages/dashboard/Voting/Voting";
import BeCandidate from "./pages/dashboard/beCandidate/BeCandidate";
import InputCode from "./pages/forgetPass/InputCode";
import InputNewPass from "./pages/forgetPass/InputNewPass";
import RecoverPass from "./pages/forgetPass/RecoverPass";
import Inicio from "./pages/inicio/Inicio";
import VerifyVotos from "./pages/inicio/VerifyVote";
import Login from "./pages/login/Login";


function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<RecoverPass />} />
        <Route path="/verificarVoto" element={<VerifyVotos />} />

        <Route path="/Campañas" element={<Dashboard />} />
        <Route path="/voting/:campaignName/:campaignId" element={<Voting />} />

        <Route path="/admin/inicio" element={<Index />} />
        

        <Route element={<ProfileGuard />} >
          <Route path="/perfil" element={<FormProfile />} />
        </Route>

        <Route element={<CandidateGuard />} >
          <Route path="/serCandidato" element={<BeCandidate />} />
        </Route>


        <Route element={<EmailSentGuard />}>
          <Route path="/inputcode" element={<InputCode />} />
        </Route>

        <Route element={<GuardVerificode />}>
          <Route path="/VerificarCuenta" element={<InputCode />} />
        </Route>


        <Route element={<Guard />} >
          <Route path="/inputnewpassword" element={<InputNewPass />} />
        </Route>


      </Routes>
    </BrowserRouter>


  )
}

export default App
