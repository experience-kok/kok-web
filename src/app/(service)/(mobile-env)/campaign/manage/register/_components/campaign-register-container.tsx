'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { CampaignCreateForm } from 'schemas/campaign-create-schema';

import { usePostCampaignMutation } from 'services/campaign/campaign-mutation';
import { PostCampaignRequest } from 'services/campaign/campaign-types';
import { postPresignedUrlForCampaignImage } from 'services/image/image-api';
import { CampaignImageExtension } from 'services/image/image-types';

import ImageUpload from './sections/image-upload';
import InfoForm from './sections/info-form';

export default function CampaignRegisterContainer() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: postCampaignMutate } = usePostCampaignMutation();

  // 이미지 변경 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      alert('JPG 또는 PNG 파일만 업로드할 수 있어요.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setSelectedFile(file);
  };

  const handleSubmit = async (formData: CampaignCreateForm) => {
    console.log('폼 데이터:', formData);
    console.log('선택된 파일:', selectedFile);

    if (!selectedFile) {
      toast.error('썸네일 이미지를 선택해주세요.', {
        position: 'top-center',
      });
      return;
    }

    try {
      // 1. 이미지 업로드를 위한 presigned URL 요청
      const fileExtension = selectedFile.name.split('.').pop() as CampaignImageExtension;
      const { presignedUrl } = await postPresignedUrlForCampaignImage(fileExtension);
      const imageUrl = presignedUrl.split('?')[0];

      // 2. 이미지 업로드
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: selectedFile,
      });

      if (!response.ok) {
        throw new Error('이미지 업로드 실패');
      }

      // 3. 미션 키워드를 배열로 변환
      const missionKeywords = formData.missionKeywords
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0);

      // 4. PostCampaignRequest 타입에 맞게 데이터 변환
      const finalData: PostCampaignRequest = {
        thumbnailUrl: imageUrl,
        campaignType: formData.campaignType,
        title: formData.title,
        productShortInfo: formData.productShortInfo,
        maxApplicants: formData.maxApplicants,
        productDetails: formData.productDetails,
        recruitmentStartDate: formData.recruitmentStartDate,
        recruitmentEndDate: formData.recruitmentEndDate,
        applicationDeadlineDate: formData.applicationDeadlineDate,
        selectionDate: formData.selectionDate,
        reviewDeadlineDate: formData.reviewDeadlineDate,
        selectionCriteria: formData.selectionCriteria,
        missionGuide: formData.missionGuide,
        missionKeywords: missionKeywords,
        category: {
          type: formData.categoryType,
          name: formData.categoryName,
        },
        companyInfo: {
          companyName: formData.companyName,
          businessRegistrationNumber: formData.businessRegistrationNumber || '',
          contactPerson: formData.contactPerson,
          phoneNumber: formData.phoneNumber,
        },
      };

      console.log('최종 데이터:', finalData);

      // 5. 캠페인 생성 API 호출
      postCampaignMutate(finalData);
    } catch (error) {
      console.error('캠페인 등록 실패:', error);
      toast.error('캠페인 등록에 실패했어요. 다시 시도해주세요.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 hidden lg:block">
          <h1 className="mb-2 text-center text-3xl font-bold">캠페인 등록</h1>
          <p className="text-muted-foreground text-center">새로운 체험 캠페인을 등록해보세요</p>
        </div>

        {/* 썸네일 등록 */}
        <ImageUpload preview={preview} onFileChange={handleFileChange} />

        {/* 기본 정보 - 폼이 자체적으로 관리됨 */}
        <InfoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
