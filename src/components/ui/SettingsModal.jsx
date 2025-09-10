import { useState, useEffect, useRef } from "react"
import { useDashboard } from "../../context/DashboardContext"
import { useAuth } from "../../context/AuthContext"
import { X, CircleUserRound, SunMoon, HardDrive } from "lucide-react"
import InputField from "./InputField"

const SettingsModal = () => {
    const { activeUser } = useAuth();
    const settingsRef = useRef();
    const [isEditing, setEditing] = useState(false);
    const { settingMenuState, toggleSettingMenu } = useDashboard();
    const settingsList = [
        { setting: 'Account', icon: <CircleUserRound size={18}/> },
        { setting: 'Theme', icon: <SunMoon size={18}/> },
        { setting: 'Storage', icon: <HardDrive size={18}/> }
    ];

    const toggleEditMode = () => {
        setEditing(prev => !prev);
    }

    useEffect(() => {
        if (settingMenuState) {
            settingsRef.current.showModal();
        }
        else {
            settingsRef.current.close();
        };

    }, [settingMenuState]);

    return (
        <dialog className="w-80 h-160 left-1/2 top-1/2 bg-transparent open:w-[90%] open:max-w-150 open:h-150 open:grid open:grid-cols-[35%_65%] open:grid-rows-1 [grid-template-areas:'sidebar_main'] -translate-1/2 text-text border border-border-line rounded-2xl backdrop:bg-neutral-900/5 backdrop:backdrop-blur-xs relative"
                ref={settingsRef}>
            <button type="button"
                        className="absolute right-[0.75rem] top-[0.75rem] rounded-full cursor-pointer"
                        onClick={toggleSettingMenu}>
                    <X size={20} />
            </button>
            <aside className="w-full h-full bg-sidebar [grid-area:sidebar]">
                <ul className="w-full h-full flex flex-col p-2">
                    {settingsList.map((obj, idx) => {
                        return (
                            <li key={idx}
                                className="h-12 w-full px-4 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-sidebar-btn"
                                onClick={() => {}}>
                                {obj.icon}
                                {obj.setting}
                            </li>
                        );
                    })}
                </ul>
            </aside>
            <section className="w-full h-full bg-background [grid-area:main] flex flex-col gap-2 p-4">
                <p className="text-2xl font-medium">Account</p>
                <div className="w-full h-full flex flex-col">
                    <ul className="w-full min-h-1/2 flex flex-col">
                        <li className="py-4 border-b border-border-line">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm">Username</span>
                                <span className="text-lg">{activeUser.username}</span>
                            </div>
                        </li>
                        <li className="py-4 border-b border-border-line">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm">Email</span>
                                <span className="text-lg">razr1789@gmail.com</span>
                            </div>
                        </li>
                        <li className="py-4 border-b border-border-line">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm">Password</span>
                                <span className="text-lg">**************</span>
                            </div>
                        </li>
                    </ul>
                    {/* <button type="button"
                            className="w-40 h-10 mt-auto bg-white text-black rounded-lg cursor-pointer"
                            onClick={toggleEditMode}>
                        Edit
                    </button> */}
                </div>
            </section>
        </dialog>   
    );
};

export default SettingsModal