'use client';
import dynamic from 'next/dynamic';
import formatTime from '@/utils/formatTime';
import { Suspense, useState, useEffect } from 'react';
import getUserInfo from '@/lib/getUserInfo';

const PostVote = dynamic(() => import('@/components/post/PostVote'));

type Props = {
  comments: Array<{
    html: string;
    like: number;
    dislike: number;
    author: string;
    ctime: number;
    avatar: string;
  }>;
};

type UserInfo = {
  name: string;
  avatar: string;
};



function PostComments({ comments }: Props) {
  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchUserInfos = async () => {
      const userInfoCache = new Map();
      const fetchedUserInfos = [];

      for (const comment of comments) {
        if (!userInfoCache.has(comment.author)) {
          const userInfo = await getUserInfo(comment.author);
          userInfoCache.set(comment.author, userInfo);
        }
        fetchedUserInfos.push(userInfoCache.get(comment.author));
      }

      setUserInfos(fetchedUserInfos);
    };

    fetchUserInfos();
  }, [comments]);

  const content = comments.map((comment, index) => {
    const userInfo : UserInfo = userInfos[index];
    return (
      <div
        key={index}
        className="pl-3 gh-border dark:border-gh-darkborder  dark:bg-gh-darkbg rounded-xl flex flex-row mb-6"
      >
        <PostVote
          avatar={userInfo?.avatar}
          like={comment.like}
          dislike={comment.dislike}
        />

        <div className="flex flex-col w-full">
          <div className="h-8 bg-gh-bg dark:bg-gh-subtledarkbg w-full rounded-tr-xl border-b border-gh-border dark:border-gh-darkborder flex flex-row pl-4 items-center">
            <p className="text-sm font-bold">{userInfo?.name}</p>
            <p className="text-sm text-gh-gray-7 dark:text-gh-gray-2 ml-2">
              {formatTime(comment.ctime)}
            </p>
          </div>
          <div
            className="p-5 w-10/12"
            dangerouslySetInnerHTML={{ __html: comment.html }}
          ></div>
        </div>
      </div>
    );
  });

  return <>{content}</>;
}

export default PostComments;