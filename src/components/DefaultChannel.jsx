import './styles/Main.css'
import logo from "../assets/EDUSPACE.png";

function DefaultChannel() {
    return (
        <>
            <section className="login-page">
                <section id="hero">
                    <h1>EduSpace</h1>
                    <img src={logo} alt="logo" />
                </section>
            </section>
        </>
    )
}

export default DefaultChannel;