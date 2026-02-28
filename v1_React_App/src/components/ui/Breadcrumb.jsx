import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { useNotebooks } from "@/context/NotebookContext";
import { useNotes } from "@/context/NoteContext";

const Breadcrumb = () => {
    const { pathname } = useLocation();
    const { activeNotes } = useNotes();
    const { activeNB } = useNotebooks();
    const { notebookId, noteId } = useParams();
    const navigate = useNavigate();
    const [isMobile, setMobile] = useState(window.innerWidth < 640);

    const currentNote = activeNotes.find(n => n.id === noteId)?.title;
    const currentNB = activeNB.find(nb => nb.id === notebookId)?.title;

    const breadcrumbItems = useMemo(() => {
        const item = [
            {
                label: 'Dashboard',
                isActive: pathname === '/dashboard',
            }
        ];

        if (pathname.includes('/trash')) {
            item.push({
                label: 'Trash',
                isActive: pathname === '/dashboard/trash',
            });
        };

        if (currentNB) {
            item.push({
                label: currentNB,
                isActive: pathname === `/dashboard/notebooks/${notebookId}`,
            });
        };

        if (currentNote) {
            item.push({
                label: currentNote,
                isActive: true,
            });
        };

        return item;
    }, [pathname, currentNB, currentNote, notebookId]);

    const handleNavigation = (target) => {
        const currentIdx = breadcrumbItems.length - 1;
        const stepBack = currentIdx - target;
        navigate(-stepBack);
    };

    const BreadcrumbLink = ({ index, link }) => {
        return (
            <>
                {index === 0 ? null : <ChevronRight size={18} />}
                <button className={`${link.isActive ? 'text-text' : 'hover:underline'}`}
                        onClick={() => !link.isActive ? handleNavigation(index) : null}>
                    {isMobile && index < 2 && currentNote ? '...' : link.label}
                </button>
            </>
        );
    };

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex items-center text-SBL-text gap-0.5 md:gap-2">
            {breadcrumbItems.map((link, idx) => <BreadcrumbLink key={idx} index={idx} link={link} /> )}
        </div>
    );
};
Breadcrumb.displayName = 'BreadCrumbs';

export default Breadcrumb