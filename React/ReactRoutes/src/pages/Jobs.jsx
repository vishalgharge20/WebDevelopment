import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Jobs = () => {
    const jobsData = useLoaderData(); // Fetch jobs data from the loader

    return (
        <div className='Jobs'>
            {jobsData.map((job) => (
                <Link key={job.id} to={`/Jobs/${job.id}`}>
                    <h4>{job.Title}</h4>
                    <p>{job.Location}</p>
                </Link>
            ))}
        </div>
    );
};

export default Jobs;

// Loader function
export const JobsLoader = async () => {
        const res = await fetch("http://localhost:3000/Jobs");
        if (!res.ok) {
            throw Error("Failed to load Jobs List");
        }
        return await res.json(); // Return JSON data to be used by the component
};


