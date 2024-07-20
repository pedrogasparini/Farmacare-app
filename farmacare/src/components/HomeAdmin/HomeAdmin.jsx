import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";


const HomeAdmin = () => {
    return (
        <div>
            <Header />
            <div className="nav-container">
            <Navbar />
            </div>
            <Footer />
        </div>
    );
}

export default HomeAdmin;