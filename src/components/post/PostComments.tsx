import PostVote from "@/components/post/PostVote";
import getUserInfo from "@/lib/getUserInfo"; 
import { formatDateTime } from "@/components/ArticleColumn";

type Props = {
    comments: Array<{
      html: string;
      like: number;
      dislike: number;
      author: string;
      ctime: number;
    }>;

}

export default async function PostComments({comments} : Props) {
  const userInfoPromises = comments.map((comment) => getUserInfo(comment.author));
  const userInfos = await Promise.all(userInfoPromises);
    const content = comments.map((comment, index) => {
        const userInfo = userInfos[index];
        return (
            <div className="pl-3 gh-border dark:border-gh-darkborder  dark:bg-gh-subtledarkbg rounded-xl flex flex-row mb-6">
            <PostVote avatar={userInfo.avatar} like={comment.like} dislike={comment.dislike}/>
            <div className="flex flex-col w-full">
              <div className="h-8 bg-gh-bg w-full rounded-tr-xl border-b flex flex-row pl-4 items-center">
                <p className="text-sm font-bold">{userInfo.name}</p>
                <p className="text-sm text-gh-gray-7 dark:text-gh-gray-2 ml-2">
                  {formatDateTime(comment.ctime)}
                </p>
              </div>
              <div className="p-5 w-10/12" dangerouslySetInnerHTML={{ __html: comment.html }} >

              </div>
            </div>
            
          </div>

        )
    })
  return content;
}
