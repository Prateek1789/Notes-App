import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const LandingLayout = () => {
    return (
        <>
            <NavBar />
            <main className="h-full w-full flex flex-col items-center justify-center">
                <Outlet />
            </main>
        </>
    );
};

export default LandingLayout