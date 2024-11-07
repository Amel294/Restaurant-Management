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
        <div className={`bg-white p-3 w-full flex items-start rounded-lg  ${ backgroundColor }`}>
            <div className='flex items-center p-5 bg-green-200 rounded-full m-6 '>{icon}</div>
            <div className='py-4'>
                <div className="text-4xl font-extrabold">{value}</div>
                <div className='text-sm py-1'>{title}</div>
                <div className="flex flex-row items-center gap-2">
                    <div className={`${ changeColor } flex items-center rounded-full p-1`}>
                        {changeIcon }
                    </div>
                    <div className='text-xxs'>
                        <span>{change.value}</span><span>{change.percent}%</span> <span>({change.period})</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDashboardOverview;