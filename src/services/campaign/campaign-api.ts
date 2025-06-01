import clientFetcher from 'utils/client-side/client-fetcher';

import { PostCampaignRequest } from './campaign-types';

export const postCampaign = (requestBody: PostCampaignRequest) => {
  const response = clientFetcher.post<null>(`/campaigns`, {
    ...requestBody,
  });

  return response;
};
