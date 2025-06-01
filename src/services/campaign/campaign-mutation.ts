import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { postCampaign } from './campaign-api';

/**
 * 캠페인 등록 뮤테이션
 */
export const usePostCampaignMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postCampaign,
    onSuccess: () => {
      toast.success('캠페인 등록에 성공했어요.', {
        position: 'top-center',
      });

      router.push('/campaign/manage');
    },
    onError: () => {
      toast.error('캠페인 등록에 실패했어요.', {
        position: 'top-center',
      });
    },
  });
};
