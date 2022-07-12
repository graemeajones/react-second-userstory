import Header from './Header.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Modal from '../UI/Modal.js';
import './Layout.css';


export default function Layout({ children }) {
  // Properties ----------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <Modal.Provider>
      <div className="Layout">
        <div className="StickyHeader">
          <Header />
          <Navbar />
        </div>
        <main className="Layout">{children}</main>
        <Footer />
      </div>
    </Modal.Provider>
  );
}
