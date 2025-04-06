import Welcome from "../components/Welcome"
import Navbar from "../components/NavBar"

function HomePage() {
    
    return (
        <div class={`bg-gradient-animated text-white min-h-screen `}>
            <Navbar />
            <Welcome />
        </div>
    )
}
export default HomePage