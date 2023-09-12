import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import useTypedPage from '@/Hooks/useTypedPage';

import JobCard from '@/Components/JobCard';

export default function JobApplications() {
  const page = useTypedPage();

  const jobApplications = page.props.applications;

  return (
    <AppLayout
      title="Application History"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Application History
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <div className="px-5 pb-5">
              {jobApplications.length === 0 && (
                <p className="text-center">No job applications yet.</p>
              )}
              {jobApplications.length > 0 && (
                <ul className="d-flex mt-3 p-4 bg-gray-100 divide-y divide-gray-200 dark:divide-gray-700">
                  {jobApplications.map(
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
