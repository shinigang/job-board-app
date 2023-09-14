import React from 'react';
import { Link } from '@inertiajs/react';
import { Hyperlink } from '@/types';

type Props = {
  links: Hyperlink[];
  className?: string;
};

export default function Pagination({ links, className }: Props) {
  function getClassName(active: boolean) {
    if (active) {
      return 'mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white';
    } else {
      return 'mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary';
    }
  }

  return (
    links.length > 3 && (
      <div className={`mb-5 ${className}`}>
        <div className="flex flex-wrap">
          {links.map((link, key) =>
            link.url === null ? (
              <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
              </div>
            ) : (
              <Link className={getClassName(link.active)} href={link.url}>
                <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
              </Link>
            ),
          )}
        </div>
      </div>
    )
  );
}
