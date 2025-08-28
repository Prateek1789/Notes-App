import { ShieldCheck, NotebookPen, Code } from "lucide-react";

const FeatureCard = ({heading, info, icon}) => {
    const getIcon = () => {
        switch(icon) {
            case 'note': return <NotebookPen />;
            case 'code': return <Code />;
            case 'shield': return <ShieldCheck />;
            default: return '';
        }
    };

    return (
        <div className="card w-85 min-h-80 bg-[#090909] border border-[var(--color-Gray-700)] rounded-xl flex flex-col justify-center items-center gap-8 lg:w-80 xl:w-85 xl:min-h-100">
            {getIcon()}
            <h3 className="font-semibold">{heading}</h3>
            <p className="text-sm max-w-[32ch]">{info}</p>
        </div>
    )
}

export default FeatureCard