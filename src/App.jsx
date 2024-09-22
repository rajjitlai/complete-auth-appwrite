import { Toaster } from 'react-hot-toast';
import Register from './auth/Register';
import Login from './auth/Login';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
