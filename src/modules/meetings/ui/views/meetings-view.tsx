"use client";
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const MeetingView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>MeetingView
        {JSON.stringify(data)}
    </div>
  )
}

export default MeetingView

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="An error occurred while trying to load the meetings. Please try again later."
    />
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait while we load the meetings."
    />
  );
};
