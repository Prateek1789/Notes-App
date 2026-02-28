import { PanelLeft } from "lucide-react"
import { useDashboard } from "../../context/DashboardContext";

const SidebarToggle = ({ modifier }) =>{
    const { toggleSidebar } = useDashboard();

    return (
        <button type="button"
                className={`rounded-sm cursor-pointer ${modifier}`}
                onClick={toggleSidebar}>
            <span className="sr-only">Toggle Sidebar</span>
            <PanelLeft className="size-5 lg:size-6 cursor-pointer"/>
        </button>
    );
};

export default SidebarToggle