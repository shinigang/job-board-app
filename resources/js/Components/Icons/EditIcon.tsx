import React from 'react';

type Props = {
  className?: String;
  // All other props
  [x: string]: any;
};

const EditIcon = ({ className, ...otherProps }: Props) => {
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
      className={`ri-edit-fill ${className ?? ''}`}
      {...otherProps}
    >
      <path d="M7.24264 17.9964H3V13.7538L14.435 2.31877C14.8256 1.92825 15.4587 1.92825 15.8492 2.31877L18.6777 5.1472C19.0682 5.53772 19.0682 6.17089 18.6777 6.56141L7.24264 17.9964ZM3 19.9964H21V21.9964H3V19.9964Z"></path>
    </svg>
  );
};

export default EditIcon;
