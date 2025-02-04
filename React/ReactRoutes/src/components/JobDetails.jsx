import React from 'react'
import { useLoaderData } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

const JobDetails = () => {

    // const {id} = useParams()

    const JobDetails = useLoaderData()

  return (
    <div className='JobDetails'>
        <p><b>Job Title:</b>{JobDetails.Title}</p>
        <p><b>Salary:</b>{JobDetails.Salary}</p>
        <p><b>Location:</b>{JobDetails.Location}</p>
        <p><b>Description:</b>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum modi voluptates animi inventore a fuga, sed temporibus ut distinctio mollitia voluptatibus blanditiis id? Veniam ducimus illum sint harum, excepturi est.
        Reiciendis, quis voluptates nam necessitatibus illum, id libero delectus ut reprehenderit ipsa rem eum repellat dolore quae facilis officiis corrupti exercitationem architecto dignissimos pariatur? In, libero magni. Maxime, eos delectus?
        </p>
        <button>Apply Now!</button>

    </div>
  )
}

export default JobDetails


// jobDetails loader 

export const JobDetailsLoader = async({params})=>{
    const {id} = params
    const res = await fetch(`http://localhost:3000/Jobs/${id}`)
    if(!res.ok){
      throw Error("Could not Find The job Details")
    }
    return await res.json()
}   
