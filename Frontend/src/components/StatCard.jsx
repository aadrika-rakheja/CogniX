import { Clock, CheckCircle, Flame, Star } from "lucide-react";

const StatCard = ({ title, value }) => {

    const getIcon = (title) => {
        if (title.includes("Hours")) return <Clock size={18} />;
        if (title.includes("Completed")) return <CheckCircle size={18} />;
        if (title.includes("Streak")) return <Flame size={18} />;
        if (title.includes("Score")) return <Star size={18} />;
        return <Star size={18} />;
    };

    return (
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-sm">
            
            {/* LEFT CONTENT */}
            <div>
                <p className="text-sm font-medium text-gray-500">
                    {title}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-gray-900">
                    {value}
                </h2>
            </div>

            {/* RIGHT ICON */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                {getIcon(title)}
            </div>
        </div>
    );
};

export default StatCard;