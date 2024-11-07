// Path: client\src\components\TopSection\TopSection.tsx
import { CalendarPlus, ChevronDown } from "lucide-react"
function TopSection() {
    return (
        <div className="pt-10">
            <div className="flex justify-between">
                <div>
                    <div className="text-2xl font-semibold text-gray-900">Dashboard</div>
                    <div className="text-sm  font-thin opacity-70 text-gray-900">Hai Amel , Welcome back to Sedap Admin!</div>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-xl gap-4">
                    <div className="p-2 rounded-2xl bg-blue-200">
                        <CalendarPlus className="text-blue-500" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold">Filter Period</div>
                        <div className="text-xxs"><span>17th April 2020</span><span> - </span><span>21st May 2020</span></div>
                    </div>
                    <ChevronDown />
                </div>
            </div>
        </div>
    )
}
export default TopSection