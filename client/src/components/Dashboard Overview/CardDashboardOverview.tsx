// Path: client\src\components\Dashboard Overview\CardDashboardOverview.tsx

import { ArrowUp, ArrowDown } from 'lucide-react';

type CardProps = {
    icon: React.ReactNode;
    title: string;
    value: number;
    change: {
        percent:number;
        value: number;
        period: string;
        isIncrease: boolean;
    };
    backgroundColor?: string; 
};

function CardDashboardOverview( { icon, title, value, change, backgroundColor }: CardProps ) {
    const changeIcon = change.isIncrease ? <ArrowUp size={10} /> : <ArrowDown size={10} />;
    const changeColor = change.isIncrease ? 'bg-green-300' : 'bg-red-300';

    return (
        <div
            className={`bg-white p-5 w-full rounded-lg ${backgroundColor} grid gap-4 items-center sm:grid-cols-[auto,1fr]`}
        >
            <div className="flex items-center justify-center p-5 bg-green-200 rounded-full">
                {icon}
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="text-4xl font-extrabold">{value}</div>
                <div className="text-sm py-2">{title}</div>
                <div className="flex items-center gap-2 mt-3">
                    <div className={`${changeColor} flex items-center justify-center rounded-full p-2`}>
                        {changeIcon}
                    </div>
                    <div className="text-xs">
                        <span>{change.percent}%</span> 
                        <span> (<span>{change.value}</span> {change.period})</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDashboardOverview;
