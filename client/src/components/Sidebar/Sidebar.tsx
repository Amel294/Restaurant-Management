// Path: client\src\components\Sidebar\Sidebar.tsx
import logo from '../../assets/logo.jpg';
import { useState } from 'react';
import { dashboardItems } from '../../constants/dashboardItems';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("dashboard");

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <aside className="w-full bg-white h-screen  border-r border-gray-200">
      <div className="flex items-center mb-8">
        <img src={logo} alt="Logo" className="px-16 pt-10 w-auto min-w-52" />
      </div>
      <nav>
        <ul className="space-y-1 p-8 ps-0 pt-0">
          {Object.keys(dashboardItems).map((key: keyof typeof dashboardItems, index) => (
            <motion.li
              key={index}
              onClick={() => handleSelect(key)} 
              className={`relative flex items-center space-x-3 cursor-pointer py-3 pl-6 rounded-lg transition-colors ${
                selectedItem === key ? "bg-green-200 text-green-600 font-semibold" : "hover:bg-green-100 text-gray-700"
              }`}
              whileHover={{ scale: selectedItem === key ? 1 : 1.05,x:selectedItem === key ? 0 : 15}}  
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {selectedItem === key && (
                <div className="absolute left-0 top-0 h-full w-1 bg-green-400 rounded-r-lg"></div>
              )}

              <div className={`flex items-center space-x-3 text-sm ${selectedItem === key ? "font-semibold" : "font-medium"}`}>
                {dashboardItems[key].logo}
                <span>{dashboardItems[key].title}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
