import { X } from "lucide-react";
import { useState, useEffect } from "react";

const EventParticipationSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [eventParticipation, setEventParticipation] = useState(userData.eventParticipation || []);
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        role: "",
        date: "",
        description: ""
    });

    useEffect(() => {
        if (userData.eventParticipation) {
            setEventParticipation(userData.eventParticipation);
        }
    }, [userData.eventParticipation]);

    const handleAddEvent = () => {
        if (newEvent.eventName && newEvent.role && newEvent.date) {
            setEventParticipation([...eventParticipation, newEvent]);
            setNewEvent({ eventName: "", role: "", date: "", description: "" });
        }
    };

    const handleDeleteEvent = (index) => {
        setEventParticipation(eventParticipation.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({ eventParticipation });
        setIsEditing(false);
    };

    return (
        <div className='bg-white shadow rounded-lg p-6 mt-6'>
            <h2 className='text-xl font-semibold mb-4'>Event Participation</h2>
            {eventParticipation.length > 0 ? (
                <ul>
                    {eventParticipation.map((event, index) => (
                        <li key={index} className='mb-2'>
                            <span className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'>
                                <strong>{event.eventName}</strong> - {event.role} ({event.date})
                                <br />
                                {event.description}
                                {isOwnProfile && (
                                    <button
                                        onClick={() => handleDeleteEvent(index)}
                                        className='ml-2 text-red-500'
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No event participation added yet.</p>
            )}
            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <input
                                type='text'
                                placeholder='Event Name'
                                value={newEvent.eventName}
                                onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='text'
                                placeholder='Role'
                                value={newEvent.role}
                                onChange={(e) => setNewEvent({ ...newEvent, role: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='date'
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <textarea
                                placeholder='Description'
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <button
                                onClick={handleAddEvent}
                                className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-4'
                            >
                                Add Event
                            </button>
                            <button
                                onClick={handleSave}
                                className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-4 ml-4'
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className='mt-4 text-primary hover:text-primary-dark transition duration-300'
                            
                        >
                            Add Event
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default EventParticipationSection;