import axios from 'axios'
import Job from '../objects/Job'

let apiUrl = process.env.VUE_APP_API_SCHEME + '://' + process.env.VUE_APP_API_HOST
if (process.env.VUE_APP_API_PORT) apiUrl += ':' + process.env.VUE_APP_API_PORT

export const createJob = (job) => new Promise((resolve, reject) => {
  if (!job.location || job.location.length === 0) job.location = null
  if (!job.applyURL || job.applyURL.length === 0) job.applyURL = null
  if (!job.applyEmail || job.applyEmail.length === 0) job.applyEmail = null
  if (!job.employerImage || job.employerImage.length === 0) job.employerImage = null

  axios.post(apiUrl + '/jobs', {
    oneOff: job.oneOff,
    budget: parseInt(job.budget),
    title: job.title,
    location: job.location,
    description: job.description,
    salary: job.salary,
    applyUrl: job.applyURL,
    applyEmail: job.applyEmail,
    employerName: job.employerName,
    employerEmail: job.employerEmail,
    employerImage: job.employerImage
  }).then((response) => {
    resolve()
  }).catch((error) => {
    reject(error.response.data)
  })
})

export const activateJob = (jobID, jwt) => new Promise((resolve, reject) => {
  axios.patch(apiUrl + '/jobs/' + jobID + '/activate', {}, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  }).then((response) => resolve()).catch((error) => reject(error.response))
})

export const indexJobs = () => new Promise((resolve, reject) => {
  axios.get(apiUrl + '/jobs').then((response) => {
    resolve(response.data.jobs.map((j) => new Job(j)))
  }).catch((error) => {
    reject(error.response.data)
  })
})

export const getJob = (jobID, jwt = null) => new Promise((resolve, reject) => {
  axios.get(apiUrl + '/jobs/' + jobID, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  }).then((response) => resolve(response.data.job)).catch((error) => reject(error.response.data.error))
})

export const updateJob = (job, jwt) => new Promise((resolve, reject) => {
  if (!job.location || job.location.length === 0) job.location = null
  if (!job.applyURL || job.applyURL.length === 0) job.applyURL = null
  if (!job.applyEmail || job.applyEmail.length === 0) job.applyEmail = null
  if (!job.employerImage || job.employerImage.length === 0) job.employerImage = null

  axios.patch(apiUrl + '/jobs/' + job.id, {
    published: job.published,
    budget: parseInt(job.budget),
    title: job.title,
    location: job.location,
    description: job.description,
    salary: job.salary,
    applyUrl: job.applyURL,
    applyEmail: job.applyEmail,
    employerName: job.employerName,
    employerImage: job.employerImage
  }, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  }).then((response) => resolve()).catch((error) => reject(error.response.data.error))
})
