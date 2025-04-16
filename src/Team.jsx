import { useState } from "react";
import expertData from './experts.json';

const Team = () => {
    const [experts, setExperts] = useState(expertData);
    const [cart, setCart] = useState([]);
    const budget = 10000000; 


    // useEffect(() => {
    //     fetch('public/experts.json')
    //     .then(res=>res.json())
    //     .then(data => setExperts(data))
    //     .catch(error => console.error('Error loading experts:', error));
    // }, []);

    const handleAddToCart = (expert) => {
        if (cart.find(e => e.id === expert.id)) return;
        const newCart = [...cart, expert];
        setCart(newCart);
    };

    const totalCost = cart.reduce((sum, expert) => sum + expert.salary, 0);

    return (
        <div className="flex flex-col mx-auto items-center justify-center p-4 bg-[#F2EFE7] min-h-screen">
            {/* Header Section */}
            <div className="bg-[#006A71] flex flex-col items-center justify-center w-3/4 p-6 rounded-lg shadow-lg space-y-4">
                <h1 className="text-3xl font-bold text-white mb-4">Make a Cyber Security Team</h1>
                <p className="text-white text-center mb-4">
                    Our server is under attack so we need to hire a special cyber security team
                </p>
                <h2 className="text-xl text-white">
                    Total Budget: <strong className="text-[#9ACBD0]">${budget.toLocaleString()}</strong>
                </h2>
            </div>

            <div className="w-3/4 flex gap-4 mt-5">
                {/* Experts List */}
                <div className="w-3/4 space-y-4">
                    {experts.map(expert => (
                        <div 
                            key={expert.id} 
                            className="shadow-md rounded-sm p-4 
                                bg-gradient-to-r from-[#006A71] via-[#48A6A7] to-[#9ACBD0]
                                hover:bg-gradient-to-br hover:from-[#00555B] hover:via-[#3A8D8E] hover:to-[#85B9BE]
                                transition-all duration-500">
                            <img 
                                src={expert.img} 
                                alt={expert.name} 
                                className="w-20 h-20 rounded-full mb-2 border-2 border-[#006A71]"
                            />
                            <h6 className="font-bold text-[#F2EFE7]">{expert.name}</h6>
                            <p className="text-[#F2EFE7]">Age: {expert.age}</p>
                            <p className="text-[#F2EFE7]">Designation: {expert.designation}</p>
                            <p className="text-[#F2EFE7]">Address: {expert.address}</p>
                            <p className="text-[#F2EFE7] font-semibold">Salary: ${expert.salary.toLocaleString()}</p>
                            <button
                                onClick={() => handleAddToCart(expert)}
                                className="bg-[#006A71] hover:bg-[#00494E] text-[#F2EFE7] px-4 py-2 rounded mt-2 transition-colors"
                                disabled={cart.includes(expert) || (totalCost + expert.salary) > budget}
                            >
                                {cart.includes(expert) ? 'Added' : 'Add to Team'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Section */}
                <div className="w-1/4 bg-[#9ACBD0] p-4 rounded-lg shadow-md sticky top-4 h-[calc(100vh-200px)] overflow-y-auto">
                    <h2 className="text-xl font-bold text-[#006A71] mb-4">Team Summary</h2>
                    <p className="font-semibold text-[#006A71]">Experts added: {cart.length}</p>
                    
                    <div className="mt-4 space-y-3">
                        {cart.map(member => (
                            <div key={member.id} className="flex items-center gap-2 bg-[#F2EFE7] p-2 rounded">
                                <img 
                                    src={member.img} 
                                    alt={member.name} 
                                    className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-[#48A6A7]"
                                />
                                <p className="truncate text-[#006A71]">{member.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-[#006A71] pt-4">
                        <p className="font-bold text-[#006A71]">
                            Total Cost: ${totalCost.toLocaleString()}
                        </p>
                        <p className={`text-sm ${totalCost > budget ? 'text-red-600' : 'text-[#006A71]'}`}>
                            Remaining: ${(budget - totalCost).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;