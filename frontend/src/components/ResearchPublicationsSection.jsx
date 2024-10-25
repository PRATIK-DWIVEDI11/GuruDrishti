import { useState, useEffect } from "react";
import { formatDate } from "../utils/dateUtils";
import { X } from "lucide-react"; // Import the X icon for deletion
import { Link } from "react-router-dom";

const ResearchPublicationsSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [researchPublications, setResearchPublications] = useState(userData.researchPublications || []);
    const [newResearchPublication, setNewResearchPublication] = useState({
        title: "",
        journal: "",
        publicationDate: "",
        link: "",
    });

    // Sync userData when the component mounts or userData changes
    useEffect(() => {
        if (userData.researchPublications) {
            setResearchPublications(userData.researchPublications);
        }
    }, [userData.researchPublications]);

    const handleAddResearchPublication = () => {
        if (newResearchPublication.title && newResearchPublication.journal && newResearchPublication.publicationDate) {
            setResearchPublications([...researchPublications, newResearchPublication]);
            setNewResearchPublication({
                title: "",
                journal: "",
                publicationDate: "",
                link: "",
            });
        } else {
            alert("Please fill out all fields, including the publication date.");
        }
    };

    const handleDeleteResearchPublication = (index) => {
        const updatedPublications = researchPublications.filter((_, i) => i !== index);
        setResearchPublications(updatedPublications);
    };

    const handleSave = () => {
        onSave({ researchPublications });
        setIsEditing(false);
    };

    return (
        <div className='bg-white shadow rounded-lg p-6 mt-6'>
            <h3 className='text-xl font-semibold mb-4'>Research Publications</h3>
            {researchPublications.length > 0 ? (
                <ul>
                    {researchPublications.map((publication, index) => (
                        <li key={index} className='mb-2 flex items-center justify-between'>
                            <span>
                                <strong>{publication.title}</strong> - {publication.journal} ({formatDate(publication.publicationDate)})
                                <br />
                                {/* Updated Link */}
                                <Link to={`/publications/${userData.username}`} className='text-blue-600 hover:underline'>
                                    View Publication
                                </Link>
                            </span>
                            {isOwnProfile && (
                                <button
                                    onClick={() => handleDeleteResearchPublication(index)}
                                    className='ml-2 text-red-500'
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No research publications added yet.</p>
            )}

            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <div className='mt-4 flex flex-col'>
                            <input
                                type='text'
                                placeholder='Publication Title'
                                value={newResearchPublication.title}
                                onChange={(e) => setNewResearchPublication({ ...newResearchPublication, title: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='text'
                                placeholder='Journal'
                                value={newResearchPublication.journal}
                                onChange={(e) => setNewResearchPublication({ ...newResearchPublication, journal: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='date'
                                value={newResearchPublication.publicationDate}
                                onChange={(e) => setNewResearchPublication({ ...newResearchPublication, publicationDate: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='text'
                                placeholder='Link'
                                value={newResearchPublication.link}
                                onChange={(e) => setNewResearchPublication({ ...newResearchPublication, link: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <button
                                onClick={handleAddResearchPublication}
                                className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-4'
                            >
                                Add Publication
                            </button>
                            <button
                                onClick={handleSave}
                                className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-2'
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className='mt-4 text-primary hover:text-primary-dark transition duration-300'
                        >
                            Add Research Publication
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ResearchPublicationsSection;
