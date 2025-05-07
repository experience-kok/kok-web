'use client';

import { Controller, useForm } from 'react-hook-form';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { Text } from 'components/ui/text';

import { Gender } from 'types/auth';
import { EditForm } from 'types/auth';

interface Props {
  defaultValues: {
    nickname: string;
    phone: string;
    gender: Gender;
    age: number;
  };
  onSubmit: (data: EditForm) => void;
}

/**
 * 내 정보 수정 페이지의 유저 정보 수정 폼 컴포넌트
 */
export default function ProfileForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditForm>({
    defaultValues: {
      nickname: defaultValues.nickname,
      phone: defaultValues.phone,
      gender: defaultValues.gender,
      age: defaultValues.age,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 px-6">
      <div className="grid w-full items-center gap-1.5">
        <Label className="text-md font-bold">
          닉네임 <span className="text-primary">*</span>
        </Label>
        <Input className="h-12" {...register('nickname', { required: true })} />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label className="text-md font-bold">
          전화번호 <span className="text-primary">*</span>
        </Label>
        <Input className="h-12" {...register('phone', { required: true })} />
        {errors.nickname && <Text color="red">숫자만 입력해주세요.</Text>}
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label className="text-md font-bold">
          나이 <span className="text-primary">*</span>
        </Label>
        <Input className="h-12" {...register('age', { required: true })} />
        {errors.nickname && <Text color="red">나이를 입력해주세요.</Text>}
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label className="text-md font-bold">
          성별 <span className="text-primary">*</span>
        </Label>
        <Controller
          control={control}
          name="gender"
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              className="flex items-center"
              onValueChange={field.onChange}
              value={field.value}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MALE" id="MALE" />
                <Label htmlFor="MALE">남성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FEMALE" id="FEMALE" />
                <Label htmlFor="FEMALE">여성</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="UNKNOWN" id="UNKNOWN" />
                <Label htmlFor="UNKNOWN">비공개</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.gender && <Text color="red">성별을 선택해주세요.</Text>}
      </div>

      <Button className="w-full" size="lg" type="submit">
        수정하기
      </Button>
    </form>
  );
}
