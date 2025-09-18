import { Link } from "react-router-dom"
import { useNotebooks } from "@/context/NotebookContext";
import NotebookCard from "@/components/ui/NotebookCard";

const NotoDashboard = () => {
    const { notebooks } = useNotebooks();

    return (
        <section className="w-full h-full [grid-area:_main] gird grid-cols-1 grid-rows-2">
            <section className="quick-notes w-full h-1/2 flex flex-col p-4 gap-4">
                <span className="text-2xl"></span>
                <div className="w-full h-full flex items-center justify-center text-2xl border-border-line rounded-xl">Quick Notes</div>
            </section>
            <section className="notebook w-full h-1/2 py-4 px-4 lg:px-6 flex flex-wrap items-start gap-4 overflow-scroll">
                {notebooks.map(nb => <NotebookCard key={nb.id} id={nb.id} title={nb.title} createdOn={nb.createdOn} /> )}
            </section>
        </section>
    );
};

export default NotoDashboard