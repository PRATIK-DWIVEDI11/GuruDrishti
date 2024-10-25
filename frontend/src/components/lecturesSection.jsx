import { X } from "lucide-react";
import { useState, useEffect } from "react";

const LecturesSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [lectures, setLectures] = useState(userData.lectures || []);
    const [newLecture, setNewLecture] = useState({
        courseName: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    useEffect(() => {
        if (userData.lectures) {
            setLectures(userData.lectures);
        }
    }, [userData.lectures]);

    const handleAddLecture = () => {
        if (newLecture.courseName && newLecture.startDate && newLecture.institution) {
            setLectures([...lectures, newLecture]);
            setNewLecture({ courseName: "", institution: "", startDate: "", endDate: "", description: "" });
        }
    };

    const handleDeleteLecture = (index) => {
        setLectures(lectures.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({ lectures });
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4">Lectures</h3>
            {lectures.length > 0 ? (
                <ul>
                    {lectures.map((lecture, index) => (
                        <li key={index} className="mb-2">
                            <strong>{lecture.courseName}</strong> - {lecture.institution} ({lecture.startDate} - {lecture.endDate || "Ongoing"})
                            <br />
                            {lecture.description}
                            {isOwnProfile && (
                                <button
                                    onClick={() => handleDeleteLecture(index)}
                                    className="ml-2 text-red-500"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No lectures added yet.</p>
            )}
            {isOwnProfile && isEditing && (
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={newLecture.courseName}
                        onChange={(e) => setNewLecture({ ...newLecture, courseName: e.target.value })}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Institution"
                        value={newLecture.institution}
                        onChange={(e) => setNewLecture({ ...newLecture, institution: e.target.value })}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <input
                        type="date"
                        value={newLecture.startDate}
                        onChange={(e) => setNewLecture({ ...newLecture, startDate: e.target.value })}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <input
                        type="date"
                        value={newLecture.endDate}
                        onChange={(e) => setNewLecture({ ...newLecture, endDate: e.target.value })}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <textarea
                        placeholder="Description"
                        value={newLecture.description}
                        onChange={(e) => setNewLecture({ ...newLecture, description: e.target.value })}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <button
                        onClick={handleAddLecture}
                        className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-4"
                    >
                        Add Lecture
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-4 ml-4"
                    >
                        Save
                    </button>
                </div>
            )}
            {!isEditing && isOwnProfile && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 text-primary hover:text-primary-dark transition duration-300"
                >
                    Add Lecture
                </button>
            )}
        </div>
    );
};

export default LecturesSection;
