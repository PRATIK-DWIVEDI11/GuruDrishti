import React from 'react';
import { useParams } from 'react-router-dom';

const PublicationDetail = ({ userData }) => {
    const { id } = useParams(); // Get the ID from the URL
    const publication = userData.researchPublications[id]; // Get the publication based on the ID

    if (!publication) {
        return <div>Publication not found.</div>; // Handle the case where the publication doesn't exist
    }

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold'>{publication.title}</h2>
            <p><strong>Journal:</strong> {publication.journal}</p>
            <p><strong>Publication Date:</strong> {formatDate(publication.publicationDate)}</p>
            {publication.link && (
                <p>
                    <a href={publication.link} target='_blank' rel='noreferrer' className='text-blue-600 hover:underline'>
                        Read Full Publication
                    </a>
                </p>
            )}
        </div>
    );
};

export default PublicationDetail;
