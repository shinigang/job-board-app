import React, { useState } from 'react';
import { router } from '@inertiajs/core';
import useRoute from '@/Hooks/useRoute';

import useTypedPage from '@/Hooks/useTypedPage';
import AppLayout from '@/Layouts/AppLayout';
import { SearchIcon } from '@/Components/Icons';
import JobCard from '@/Components/JobCard';

export default function Jobs() {
  const route = useRoute();
  const page = useTypedPage();

  const jobPostings = page.props.jobs;
  const [keyword, setKeyword] = useState(page.props.keyword);

  const searchJobHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword) {
      router.get(route('jobs.index'), { keyword });
    } else {
      router.get(route('jobs.index'));
    }
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
                          applying={true}
                          manage={false}
                          onEdit={jobId => false}
                          onDeleted={jobId => false}
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
