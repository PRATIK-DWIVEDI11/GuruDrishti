import { X } from "lucide-react";
import { useState, useEffect } from "react";

const SeminarsSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [seminars, setSeminars] = useState(userData.seminars || []);
    const [newSeminar, setNewSeminar] = useState({
        topic: "",
        date: "",
        description: "",
        link: ""
    });

    useEffect(() => {
        if (userData.seminars) {
            setSeminars(userData.seminars);
        }
    }, [userData.seminars]);

    const handleAddSeminar = () => {
        if (newSeminar.topic && newSeminar.date) {
            setSeminars([...seminars, newSeminar]);
            setNewSeminar({ topic: "", date: "", description: "", link: "" });
        }
    };

    const handleDeleteSeminar = (index) => {
        setSeminars(seminars.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({ seminars });
        setIsEditing(false);
    };

    return (
        <div className='bg-white shadow rounded-lg p-6 mt-6'>
            <h3 className='text-xl font-semibold mb-4'>Seminars</h3>
            {seminars.length > 0 ? (
                <ul>
                    {seminars.map((seminar, index) => (
                        <li key={index} className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mb-2 flex items-center'>
                            <div className='flex-grow'>
                                <strong>{seminar.topic}</strong> - {seminar.date}
                                <br />
                                {seminar.description}
                                {seminar.link && (
                                    <a href={seminar.link} target='_blank' rel='noreferrer' className='text-blue-500 hover:underline'>
                                        View Seminar
                                    </a>
                                )}
                            </div>
                            {isOwnProfile && (
                                <button
                                    onClick={() => handleDeleteSeminar(index)}
                                    className='ml-2 text-red-500'
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No seminars added yet.</p>
            )}

            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <input
                                type='text'
                                placeholder='Seminar Topic'
                                value={newSeminar.topic}
                                onChange={(e) => setNewSeminar({ ...newSeminar, topic: e.target.value })}
                                className='flex-grow p-2 border rounded mt-2'
                            />
                            <input
                                type='date'
                                value={newSeminar.date}
                                onChange={(e) => setNewSeminar({ ...newSeminar, date: e.target.value })}
                                className='flex-grow p-2 border rounded mt-2'
                            />
                            <textarea
                                placeholder='Description'
                                value={newSeminar.description}
                                onChange={(e) => setNewSeminar({ ...newSeminar, description: e.target.value })}
                                className='flex-grow p-2 border rounded mt-2'
                            />
                            <input
                                type='text'
                                placeholder='Link (optional)'
                                value={newSeminar.link}
                                onChange={(e) => setNewSeminar({ ...newSeminar, link: e.target.value })}
                                className='flex-grow p-2 border rounded mt-2'
                            />
                            <div className='flex mt-4'>
                                <button
                                    onClick={handleAddSeminar}
                                    className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
                                >
                                    Add Seminar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 ml-4'
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                        onClick={() => setIsEditing(true)}
                        className='mt-4 text-primary hover:text-primary-dark transition duration-300'
                        >
                            Add Seminar
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default SeminarsSection;
