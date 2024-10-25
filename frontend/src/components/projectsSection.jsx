import { X } from "lucide-react";
import { useState, useEffect } from "react";

const ProjectsSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [projects, setProjects] = useState(userData.projects || []);
    const [newProject, setNewProject] = useState({
        projectTitle: "",
        description: "",
        startDate: "",
        endDate: "",
        link: ""
    });

    useEffect(() => {
        if (userData.projects) {
            setProjects(userData.projects);
        }
    }, [userData.projects]);

    const handleAddProject = () => {
        if (newProject.projectTitle && newProject.startDate) {
            setProjects([...projects, newProject]);
            setNewProject({ projectTitle: "", description: "", startDate: "", endDate: "", link: "" });
        }
    };

    const handleDeleteProject = (index) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({ projects });
        setIsEditing(false);
    };

    return (
        <div className='bg-white shadow rounded-lg p-6 mt-6'>
            <h3 className='text-xl font-semibold mb-4'>Projects</h3>
            {projects.length > 0 ? (
                <ul>
                    {projects.map((project, index) => (
                        <li key={index} className='mb-2'>
                            <span className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'>
                                <strong>{project.projectTitle}</strong> ({project.startDate} - {project.endDate || "Ongoing"})
                            </span>
                            <p>{project.description}</p>
                            {project.link && (
                                <a href={project.link} target='_blank' rel='noreferrer' className='text-blue-500 hover:underline'>
                                    View Project
                                </a>
                            )}
                            {isOwnProfile && (
                                <button
                                    onClick={() => handleDeleteProject(index)}
                                    className='ml-2 text-red-500'
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No projects added yet.</p>
            )}

            {isOwnProfile && (
                <>
                    {isEditing ? (
                        <>
                            <input
                                type='text'
                                placeholder='Project Title'
                                value={newProject.projectTitle}
                                onChange={(e) => setNewProject({ ...newProject, projectTitle: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <textarea
                                placeholder='Description'
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='date'
                                value={newProject.startDate}
                                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='date'
                                value={newProject.endDate}
                                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <input
                                type='text'
                                placeholder='Link (optional)'
                                value={newProject.link}
                                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                className='w-full p-2 border rounded mt-2'
                            />
                            <button
                                onClick={handleAddProject}
                                className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 mt-4'
                            >
                                Add Project
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
                            Add Project
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ProjectsSection;
