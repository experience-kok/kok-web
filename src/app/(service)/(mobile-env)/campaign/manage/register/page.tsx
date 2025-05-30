'use client';

import type React from 'react';
import { useState } from 'react';

import { Calendar, Upload, MapPin, Users, Clock, Building2, Target, FileText } from 'lucide-react';
import Image from 'next/image';

import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { Text } from 'components/ui/text';
import { Textarea } from 'components/ui/textarea';

export default function CampaignRegisterPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [campaignType, setCampaignType] = useState<'방문' | '배송'>('방문');
  const [category, setCategory] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 hidden lg:block">
          <h1 className="mb-2 text-center text-3xl font-bold">캠페인 등록</h1>
          <p className="text-muted-foreground text-center">새로운 체험 캠페인을 등록해보세요</p>
        </div>

        <form className="space-y-8">
          {/* 이미지 등록 영역 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                이미지 등록
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-primary/20 rounded-lg border-2 border-dashed p-8 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <Image
                      width={720}
                      height={720}
                      src={imagePreview || '/placeholder.svg'}
                      alt="Preview"
                      className="mx-auto max-h-64 rounded-lg object-cover"
                    />
                    <Button variant="outline" onClick={() => setImagePreview(null)}>
                      이미지 변경
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="text-primary/50 mx-auto h-12 w-12" />
                    <div>
                      <p className="text-lg font-medium">캠페인 대표 이미지를 업로드하세요</p>
                      <div className="flex flex-col items-center">
                        <Text size={'sm'} color="red">
                          JPG 또는 PNG 파일만 업로드할 수 있어요.
                        </Text>
                        <Text size={'sm'} color={'red'}>
                          권장 사이즈는 720px x 720px이에요.
                        </Text>
                      </div>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mx-auto max-w-xs"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-md">
                  캠페인 타입 <span className="text-primary">*</span>
                </Label>
                <Select
                  value={campaignType}
                  onValueChange={(value: '방문' | '배송') => {
                    setCampaignType(value);
                    setCategory(''); // Reset category when campaign type changes
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="캠페인 타입을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="방문">방문 타입</SelectItem>
                    <SelectItem value="배송">배송 타입</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-md">
                  카테고리 <span className="text-primary">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory} disabled={!campaignType}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        campaignType ? '카테고리를 선택하세요' : '먼저 캠페인 타입을 선택하세요'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignType === '방문' && (
                      <>
                        <SelectItem value="restaurant">맛집</SelectItem>
                        <SelectItem value="cafe">카페</SelectItem>
                        <SelectItem value="beauty">뷰티</SelectItem>
                        <SelectItem value="accommodation">숙박</SelectItem>
                      </>
                    )}
                    {campaignType === '배송' && (
                      <>
                        <SelectItem value="food">식품</SelectItem>
                        <SelectItem value="cosmetics">화장품</SelectItem>
                        <SelectItem value="lifestyle">생활용품</SelectItem>
                        <SelectItem value="fashion">패션</SelectItem>
                        <SelectItem value="accessories">잡화</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-md">
                  캠페인 제목 <span className="text-primary">*</span>
                </Label>
                <Input id="title" placeholder="캠페인 제목을 입력하세요" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-md">
                    최대 신청 인원 <span className="text-primary">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Users className="text-muted-foreground h-4 w-4" />
                    <Input id="maxApplicants" type="number" placeholder="10" min="1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-md">
                    현재 신청 인원 <span className="text-primary">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Users className="text-muted-foreground h-4 w-4" />
                    <Input id="currentApplicants" type="number" placeholder="0" min="0" disabled />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-md">
                    모집 시작일 <span className="text-primary">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <Input id="recruitmentStart" type="datetime-local" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-md">
                    모집 마감일 <span className="text-primary">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <Input id="recruitmentEnd" type="datetime-local" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 상세 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                상세 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-md">
                  제공 제품/서비스 상세 정보 <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="productDetails"
                  placeholder="어떤 제품이나 서비스를 제공하는지 자세히 설명해주세요"
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-md">
                  선정 기준<span className="text-primary">*</span>
                </Label>

                <Textarea
                  id="recruitmentPeriod"
                  placeholder="선정 과정과 기준에 대해 설명해주세요"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-md">
                  리뷰 제출 마감일<span className="text-primary">*</span>
                </Label>

                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <Input id="reviewDeadline" type="datetime-local" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-md">
                  참가자 선정일 <span className="text-primary">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <Input id="selectionDate" type="datetime-local" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 업체 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                업체 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-md">
                    업체명<span className="text-primary">*</span>
                  </Label>

                  <Input id="companyName" placeholder="업체명을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <Label className="text-md">
                    사업자등록번호<span className="text-primary">*</span>
                  </Label>

                  <Input id="businessNumber" placeholder="000-00-00000" />
                </div>
                <div className="space-y-2">
                  <Label className="text-md">
                    담당자명<span className="text-primary">*</span>
                  </Label>

                  <Input id="contactPerson" placeholder="담당자명을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <Label className="text-md">
                    연락처<span className="text-primary">*</span>
                  </Label>

                  <Input id="contactPhone" placeholder="010-0000-0000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 미션 가이드 */}
          <Card>
            <CardHeader>
              <CardTitle>미션 가이드</CardTitle>
              <p className="text-muted-foreground text-sm">마크다운 형식으로 작성 가능합니다</p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="## 미션 가이드&#10;&#10;### 1. 방문 전 준비사항&#10;- 예약 확인&#10;- 신분증 지참&#10;&#10;### 2. 체험 과정&#10;- 사진 촬영 (최소 5장)&#10;- 체험 후기 작성&#10;&#10;### 3. 리뷰 작성 가이드&#10;- 솔직한 후기 작성&#10;- 해시태그 포함"
                className="min-h-[200px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* 키워드 */}
          <Card>
            <CardHeader>
              <CardTitle>필수 포함 키워드</CardTitle>
              <p className="text-muted-foreground text-sm">
                리뷰 작성 시 반드시 포함되어야 하는 키워드를 입력하세요
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="예시: #맛집추천 #신메뉴 #분위기좋은곳 #데이트코스 #인스타맛집"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* 방문 정보 */}
          {campaignType === '방문' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  방문 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-md">
                    방문 장소 주소<span className="text-primary">*</span>
                  </Label>

                  <div className="flex gap-2">
                    <Input
                      id="visitAddress"
                      placeholder="방문할 장소의 주소를 입력하세요"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">
                      주소 검색
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>위치 지도</Label>
                  <div className="bg-primary/10 border-primary/20 rounded-lg border-2 border-dashed p-8 text-center">
                    <MapPin className="text-primary/50 mx-auto mb-4 h-12 w-12" />
                    <p className="text-lg font-medium">지도 API 연동 영역</p>
                    <p className="text-muted-foreground text-sm">
                      주소 입력 후 지도에서 정확한 위치를 확인할 수 있습니다
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-md">
                      운영 시간<span className="text-primary">*</span>
                    </Label>
                    <Input id="operatingHours" placeholder="예: 09:00 - 22:00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-md">
                      휴무일<span className="text-primary">*</span>
                    </Label>

                    <Input id="closedDays" placeholder="예: 매주 월요일" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-md">
                    주차 정보<span className="text-primary">*</span>
                  </Label>

                  <Input id="parkingInfo" placeholder="주차 가능 여부 및 주차 요금 정보" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* 제출 버튼 */}
          <div className="flex justify-center pt-6">
            <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 px-12">
              캠페인 등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
