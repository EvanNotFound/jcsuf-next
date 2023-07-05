'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import swrFetcher from '@/lib/swrFetcher';

const fetcher = (url: string) => fetch(url, {method: "GET",credentials: "include",}).then(res => res.json());

type UserData= {
  name: string;
  exp: number;
  // Add any other properties here that are part of the data object
}

export default function UserProfile() {
  // const [data, setData] = useState<UserData | null>(null);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('https://api.jcsuf.top/api/loginstatus', {
  //     method: 'GET',
  //     credentials: 'include',
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to fetch data:', error);
  //       setLoading(false);
  //     });
  // }, []);

  const { data, error, isLoading } = useSWR('https://api.jcsuf.top/api/loginstatus', fetcher);


  if (isLoading) {
    return (
      <div className="mr-2 flex items-center md:mr-4">
  		<div className="hidden flex-col md:flex">
  		<span id="namefield" className="font-bold">
  			Loading
  		</span>
  		<span
  			id="levelfield"
  			className="text-right text-sm text-gh-gray-7 dark:text-gh-gray-3"
  		>
  			Loading
  		</span>
  		</div>
  	<div
  		id="avatar"
  		className="flex h-12 w-12 cursor-pointer items-center"
  	>
  		<img
  		src="https://evan.beee.top/img/2023/07/04/ce77faad77bd58e5167c340f6362827c.webp"
  		id="ava-img"
  		className="gh-border m-0 ml-2 h-[42px] w-[42px] rounded-xl bg-gh-gray-1 p-1 dark:border-gh-gray-8 dark:bg-gh-gray-7"
      alt="Loading"
  		/>
  	</div>
  	</div>
  );
  }
  

  return (
    <div className="mr-2 flex items-center md:mr-4">
      {data && (
        <div className="hidden flex-col md:flex">
          <span id="namefield" className="font-bold">
            {data.name}
          </span>
          <span
            id="levelfield"
            className="text-right text-sm text-gh-gray-7 dark:text-gh-gray-3"
          >
            Lv{data.exp}
          </span>
        </div>
      )}
      <div
        id="avatar"
        className="flex h-12 w-12 cursor-pointer items-center"
      >
        <img
          src="https://upload.thwiki.cc/thumb/0/0a/%E9%AC%BC%E4%BA%BA%E6%AD%A3%E9%82%AA%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png/100px-%E9%AC%BC%E4%BA%BA%E6%AD%A3%E9%82%AA%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png"
          id="ava-img"
          className="gh-border m-0 ml-2 h-[42px] w-[42px] rounded-xl bg-gh-gray-1 p-1 dark:border-gh-gray-8 dark:bg-gh-gray-7"
        />
      </div>
    </div>
  );
}