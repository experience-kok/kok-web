'use client';

import { useState } from 'react';

import ImageUpload from './sections/image-upload';

export default function CampaignRegisterContainer() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 hidden lg:block">
          <h1 className="mb-2 text-center text-3xl font-bold">캠페인 등록</h1>
          <p className="text-muted-foreground text-center">새로운 체험 캠페인을 등록해보세요</p>
        </div>

        {/* 썸네일 등록 */}
        <ImageUpload preview={preview} onFileChange={handleFileChange} />
      </div>
    </div>
  );
}
