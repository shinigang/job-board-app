import React from 'react';

type Props = {
  className?: String;
  // All other props
  [x: string]: any;
};

const UserIcon = ({ className, ...otherProps }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ri-user-2-fill ${className ?? ''}`}
      {...otherProps}
    >
      <path d="M11 14.0619V20H13V14.0619C16.9463 14.554 20 17.9204 20 22H4C4 17.9204 7.05369 14.554 11 14.0619ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
    </svg>
  );
};

export default UserIcon;
