// Path: client\src\components\Total Revenue\TotalRevenue.tsx
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function TotalRevenue() {
    const data2020 = [
        { name: 'Jan', value: 20 },
        { name: 'Feb', value: 15 },
        { name: 'Mar', value: 25 },
        { name: 'Apr', value: 30 },
        { name: 'May', value: 25 },
        { name: 'Jun', value: 40 },
        { name: 'Jul', value: 25 },
        { name: 'Aug', value: 20 },
        { name: 'Sept', value: 15 },
        { name: 'Oct', value: 20 },
        { name: 'Nov', value: 25 },
        { name: 'Dec', value: 22 },
    ];

    const data2021 = [
        { name: 'Jan', value: 15 },
        { name: 'Feb', value: 20 },
        { name: 'Mar', value: 15 },
        { name: 'Apr', value: 25 },
        { name: 'May', value: 30 },
        { name: 'Jun', value: 20 },
        { name: 'Jul', value: 25 },
        { name: 'Aug', value: 30 },
        { name: 'Sept', value: 20 },
        { name: 'Oct', value: 15 },
        { name: 'Nov', value: 22 },
        { name: 'Dec', value: 25 },
    ];

    return (
        <div className="bg-white mt-10 p-3 rounded-xl">
            <div className="flex flex-row items-center justify-between pe-4 ps-4">
                <div className="flex justify-between w-full">
                    <div className="font-bold px-2 py-4">Total Revenue</div>

                    <div className="flex items-center text-blue-500 py-2 rounded-xl border-blue-500 gap-4">
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-3 bg-blue-600 border-0 rounded-full'> </div>
                            <div > 2020 </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-3 bg-red-600 border-0 rounded-full'> </div>
                            <div > 2021 </div>
                        </div>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data2020}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 40]} /> {/* Set the max value of Y-axis to 40 */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#2B9BDA" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="value" stroke="#F00" strokeWidth={2} dot={false} data={data2021} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TotalRevenue;
