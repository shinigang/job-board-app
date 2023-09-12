import { Link } from '@inertiajs/react';
import React from 'react';

import { HiredIcon } from './Icons';

export default function AuthenticationCardLogo() {
  return (
    <Link href="/">
      <HiredIcon className="w-16 h-16" />
    </Link>
  );
}
