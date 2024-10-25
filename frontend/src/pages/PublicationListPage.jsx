// PublicationListPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { formatDate } from '../utils/dateUtils';

const PublicationListPage = () => {
    const { username } = useParams();
    
    // Fetch user profile to get research publications
    const { data: userProfile, isLoading } = useQuery({
        queryKey: ['userProfile', username],
        queryFn: () => axiosInstance.get(`/users/${username}`),
    });

    if (isLoading) return <p>Loading...</p>;

    const researchPublications = userProfile.data.researchPublications || [];

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h3 className='text-xl font-semibold mb-4'>{username}'s Research Publications</h3>
            {researchPublications.length > 0 ? (
                <ul>
                    {researchPublications.map((publication, index) => (
                        <li key={index} className='mb-2'>
                            <strong>{publication.title}</strong> - {publication.journal} ({formatDate(publication.publicationDate)})
                            <br />
                            <a href={publication.link} target='_blank' rel='noreferrer' className='text-blue-600 hover:underline'>
                                View Publication
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No research publications available.</p>
            )}
        </div>
    );
};

export default PublicationListPage;
