import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import SubmitComplaint from './pages/SubmitComplaint'
import Track from './pages/Track'
import RateEmployees from './pages/RateEmployees'
import Targhibot from './pages/Targhibot'
import OquvKursi from './pages/OquvKursi'
import Choralar from './pages/Choralar'
import DavlatXaridlari from './pages/DavlatXaridlari'
import StaffPanel from './pages/StaffPanel'
import styles from './App.module.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/royxat" element={<Register />} />
            <Route path="/kirish" element={<Login />} />
            <Route path="/murojaat" element={<SubmitComplaint />} />
            <Route path="/kuzatish" element={<Track />} />
            <Route path="/baholash" element={<RateEmployees />} />
            <Route path="/targhibot" element={<Targhibot />} />
            <Route path="/oquv-kursi" element={<OquvKursi />} />
            <Route path="/choralar" element={<Choralar />} />
            <Route path="/davlat-xaridlari" element={<DavlatXaridlari />} />
            <Route path="/panel" element={<StaffPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
