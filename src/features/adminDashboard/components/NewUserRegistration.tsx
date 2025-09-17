import React from 'react';

interface NewUser {
    id: string;
    name: string;
    level: string;
}

const NewUserRegistrations: React.FC = () => {
    const newUsers: NewUser[] = [
        { id: '1', name: 'Dhalarika', level: 'LEVEL 1' },
        { id: '2', name: 'Steve', level: 'LEVEL 1' },
        { id: '3', name: 'Anrawan', level: 'LEVEL 1' },
        { id: '4', name: 'Lakshmi', level: 'LEVEL 1' },
        { id: '5', name: 'Anvar', level: 'LEVEL 1' }
    ];

    return (
        <div className="bg-[#121021] rounded-xl sm:p-6 p-4">
            <h3 className="text-white text-lg font-semibold mb-6">New User Registrations</h3>

            <div className="space-y-4">
                {newUsers.map((user) => (
                    <div>
                        <div key={user.id} className="flex items-center justify-between">
                            <span className="text-white font-medium text-md sm:text-lg">{user.name}</span>
                            <span className="text-gray-400 text-sm sm:text-lg">{user.level}</span>
                        </div>
                        <hr className='mt-2 sm:mt-4 border border-[#FFFFFF17]' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewUserRegistrations;