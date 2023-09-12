import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';

import useRoute from '@/Hooks/useRoute';

import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { SearchIcon } from '@/Components/Icons';
import JobCard from '@/Components/JobCard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Catalog() {
  const jobFormRef = useRef<null | HTMLFormElement>(null);
  const route = useRoute();
  const page = useTypedPage();
  const isAuth = page.props.auth.user;

  const [jobPostings, setJobPostings] = useState(page.props.jobs);
  const [keyword, setKeyword] = useState(page.props.keyword);
  const [formMode, setFormMode] = useState('Add');
  const { data, setData, post, patch } = useForm({
    title: '',
    available_slots: 1,
    description: '',
    industry: 'Software Development',
  });
  const [editJobId, setEditJobId] = useState<number | null>(null);

  const searchJobHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword) {
      router.get(route('jobs.index'), { keyword });
    } else {
      router.get(route('jobs.index'));
    }
  };

  const resetJobForm = () => {
    setEditJobId(null);
    setData({
      title: '',
      description: '',
      available_slots: 1,
      industry: 'Software Development',
    });
    setFormMode('Add');
  };

  const cancelEditHandler = () => {
    resetJobForm();
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (data.title.trim() === '') {
      return;
    }
    if (data.description.trim() === '') {
      return;
    }

    let toastMsg = 'Job data was created!';
    if (formMode === 'Edit') {
      toastMsg = 'Job data was updated!';
      patch(`/jobs/${editJobId}`, {
        // @ts-ignore: Unreachable code error
        onSuccess: resp => setJobPostings(resp.props.jobs),
      });
    } else {
      post(route('jobs.store'), {
        // @ts-ignore: Unreachable code error
        onSuccess: resp => setJobPostings(resp.props.jobs),
      });
    }
    toast.success(toastMsg, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    resetJobForm();
  };

  const jobEditHandler = (jobId: number) => {
    const jobToEdit = jobPostings.find(job => job.id === jobId);

    if (jobToEdit) {
      setEditJobId(jobId);
      setData({
        title: jobToEdit.title,
        description: jobToEdit.description,
        available_slots: jobToEdit.available_slots,
        industry: jobToEdit.industry,
      });
      setFormMode('Edit');

      jobFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const jobsDeletedHandler = (jobId: number) => {
    setJobPostings(prevJobs => {
      return prevJobs.filter(job => job.id !== jobId);
    });

    toast.success('Job data was deleted!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <AppLayout
      title="Job Finder"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Job Finder
        </h2>
      )}
    >
      <ToastContainer />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <form onSubmit={searchJobHandler} className="mb-4 mt-6 px-5">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Job Openings..."
                  value={keyword}
                  onChange={e => setKeyword(e.currentTarget.value)}
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>

            {isAuth && (
              <form
                ref={jobFormRef}
                onSubmit={formSubmitHandler}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 mt-3 mx-5"
              >
                <h2 className="mb-4">{formMode} Job Form</h2>
                <div className="grid md:grid-cols-2 md:gap-4">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="position_title"
                      id="position-title"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={data.title}
                      onChange={e => setData('title', e.currentTarget.value)}
                    />
                    <label
                      htmlFor="position-title"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Position Title
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="job_slots"
                      min="1"
                      max="9999"
                      id="job-slots"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={data.available_slots}
                      onChange={e =>
                        setData('available_slots', +e.currentTarget.value)
                      }
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Slots
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-4">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="job_description"
                      id="job-description"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={data.description}
                      onChange={e =>
                        setData('description', e.currentTarget.value)
                      }
                    />
                    <label
                      htmlFor="job-description"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Description
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="industry-select" className="sr-only">
                      Industry
                    </label>
                    <select
                      id="industry-select"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      value={data.industry}
                      onChange={e => setData('industry', e.currentTarget.value)}
                    >
                      <option>Software Development</option>
                      <option>Cloud Computing</option>
                      <option>Cybersecurity</option>
                      <option>Data Analytics and Big Data</option>
                      <option>
                        Artificial Intelligence (AI) and Machine Learning (ML)
                      </option>
                      <option>IT Consulting</option>
                      <option>E-commerce and Online Retail</option>
                      <option>Telecommunications</option>
                      <option>Healthcare IT</option>
                    </select>
                  </div>
                </div>
                <div className="text-right">
                  {formMode === 'Edit' && (
                    <button
                      type="button"
                      onClick={e => cancelEditHandler()}
                      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
                    >
                      Cancel Editing
                    </button>
                  )}
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {formMode == 'Add' ? 'Create Job' : 'Update Job'}
                  </button>
                </div>
              </form>
            )}

            <div className="px-5 pb-5">
              {jobPostings.length === 0 && keyword === '' && (
                <p className="text-center">No job postings yet.</p>
              )}
              {jobPostings.length === 0 && keyword !== '' && (
                <p className="text-center">
                  No job postings found with keyword: "{keyword}".
                </p>
              )}
              {jobPostings.length > 0 && (
                <ul className="d-flex mt-3 p-4 bg-gray-100 divide-y divide-gray-200 dark:divide-gray-700">
                  {jobPostings.map(
                    ({
                      title: jobTitle,
                      description,
                      industry,
                      available_slots: noOfOpenings,
                      id: jobId,
                    }) => {
                      return (
                        <JobCard
                          key={jobId}
                          jobId={jobId}
                          title={jobTitle}
                          description={description}
                          industry={industry}
                          slots={noOfOpenings}
                          applying={false}
                          manage={true}
                          onEdit={jobEditHandler}
                          onDeleted={jobsDeletedHandler}
                        />
                      );
                    },
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
