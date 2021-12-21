import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './PageLoaderStyles.scss';

export default function LoaderComponent() {
  return (
    <div className="loaderClass">
      <LinearProgress />
    </div>
  );
}