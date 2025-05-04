'use client';

import { Label } from '@radix-ui/react-dropdown-menu';
import { Camera } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Text } from 'components/ui/text';

import { useGetProfileQuery } from 'services/users/users-query';

type EditForm = {
  nickname: string;
};

/**
 * 내 정보 수정 페이지
 */
export default function MyProfileEditPage() {
  const { data: userData } = useGetProfileQuery();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditForm>();

  const onSubmit: SubmitHandler<EditForm> = data => {
    console.log(data);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-10">
        <div className="group relative cursor-pointer">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userData.user?.profileImage ?? undefined} />
            <AvatarFallback>{userData.user?.nickname ?? ''}</AvatarFallback>
          </Avatar>

          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
            <Camera size={20} className="fill-muted-foreground text-white" />
          </div>
        </div>

        <Text weight="bold" color="muted-foreground">
          프로필 이미지 등록
        </Text>
      </section>

      <section>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 px-6">
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold">아이디</Label>
            <Input
              className="h-12"
              type="email"
              id="email"
              placeholder={userData.user.email ?? ''}
              disabled
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-bold">
              닉네임 <span className="text-primary">*</span>
            </Label>
            <Input
              className="h-12"
              defaultValue={userData.user.nickname}
              {...register('nickname', { required: true })}
            />
            {errors.nickname && <Text color="red">닉네임을 입력해주세요</Text>}
          </div>

          <Button className="w-full" size="lg" type="submit">
            수정하기
          </Button>
        </form>
      </section>
    </>
  );
}
