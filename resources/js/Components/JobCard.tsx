import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

import useTypedPage from '@/Hooks/useTypedPage';

import { ArrowRightIcon, EditIcon, FeatherXIcon, LoaderIcon } from './Icons';

type Props = {
  jobId: number;
  title: string;
  description: string;
  industry: string;
  slots: number;
  applying: boolean;
  manage: boolean;
  onEdit: (jobId: number) => void;
  onDeleted: (jobId: number) => void;
};

const JobCard = ({
  jobId,
  title,
  description,
  industry,
  slots,
  applying = false,
  manage = false,
  onEdit,
  onDeleted,
}: Props) => {
  const route = useRoute();
  const applyForm = useForm();
  const deleteForm = useForm();

  const page = useTypedPage();
  const appliedJobs = page.props.applications;
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(
    appliedJobs ? appliedJobs.findIndex(job => job.id === jobId) > -1 : false,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const applyJobHandler = () => {
    setIsApplying(true);
    applyForm.post(route('jobs.apply', jobId), {
      onFinish: () => {
        setIsApplying(false);
        setHasApplied(true);
      },
    });
  };

  const editJobHandler = () => {
    onEdit(jobId);
  };

  const deleteJobHandler = async () => {
    setIsDeleting(true);
    deleteForm.delete(route('jobs.destroy', jobId), {
      onFinish: () => {
        setIsDeleting(false);
        onDeleted(jobId);
      },
    });
  };

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="capitalize text-sm font-medium text-gray-900 truncate dark:text-white">
            {title}
            <span className="inline ml-3 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {industry}
            </span>
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="inline-flex flex-col items-center text-gray-900 dark:text-white">
          <span className="font-semibold text-md font-semibold">{slots}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Slots
          </span>
        </div>
        {page.props.auth.user && applying && (
          <div className="px-3">
            <button
              onClick={e => applyJobHandler()}
              type="button"
              disabled={isApplying || hasApplied}
              className={`w-[145px] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                hasApplied
                  ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              {isApplying && (
                <>
                  <LoaderIcon width="14" height="14" className="spin" />
                  <span>Applying...</span>
                </>
              )}
              {!isApplying && !hasApplied && (
                <>
                  Apply Now!
                  <ArrowRightIcon className="w-3.5 h-3.5 ml-2" />
                </>
              )}
              {hasApplied && <span>Already Applied</span>}
            </button>
          </div>
        )}
        {page.props.auth.user && manage && (
          <div className="flex gap-1 px-3">
            <button
              onClick={e => editJobHandler()}
              type="button"
              className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <EditIcon width="18" height="18" />
            </button>
            <button
              onClick={e => deleteJobHandler()}
              type="button"
              disabled={isDeleting}
              className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <FeatherXIcon width="18" height="18" />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default JobCard;
