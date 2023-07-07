import Link from "next/link";
import {ArrowUpIcon, ArrowDownIcon, CommentDiscussionIcon, FlameIcon, TrashIcon} from '@primer/octicons-react'
import DeleteButton from "../home/DeleteButton";
import formatTime from "@/utils/formatTime";


type ArticleColumnProps = {
    id: number,
    title: string,
    ctime: number,
    snapshot: string,
    like: number,
    dislike: number,
    ccount: number,
    view: number,
    url: string,
    author_name: string,
    uid: number,
    author: number,
    admin: boolean
}



export default function ArticleColumn(props: ArticleColumnProps) {
    return (
        <div
        className="mx-2 flex flex-row justify-between md:mx-6"
        id={"post-" + props.id}
        key={props.id}
    >
        <div
            className="post-column w-7/12 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg"
            id={"article-desc-" + props.id}
        >
            <h4 className="mb-1 text-center text-lg font-bold">
                <Link href={props.url}>
                    {props.title}
                </Link>
            </h4>
            <p className="text-center text-sm">
                {props.snapshot}
            </p>
        </div>
        <div
            className="gh-border m-2.5 hidden w-2/12 max-w-[135px] flex-col justify-center rounded-xl bg-white px-2 py-3 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg md:flex"
            id={"post-stat-" + props.id}
        >
            <div className="flex flex-wrap justify-center gap-1.5">
                <div className="article-info-stats-item">
                    <ArrowUpIcon size={16} />
                    <p className="ml-0.5 text-sm text-gh-gray-8 dark:text-gh-gray-2">
                        {props.like}
                    </p>
                </div>

                <div className="article-info-stats-item">
                    <CommentDiscussionIcon size={16} />
                    <p className="ml-1 text-sm text-gh-gray-8 dark:text-gh-gray-2">
                        {props.ccount}
                    </p>
                </div>
                <div className="article-info-stats-item">
                    <ArrowDownIcon size={16} />
                    <p className="ml-0.5 text-sm text-gh-gray-8 dark:text-gh-gray-2">
                        {props.dislike}
                    </p>
                </div>
                <div className="article-info-stats-item">
                    <FlameIcon size={16} />
                    <p className="ml-0.5 text-sm text-gh-gray-8 dark:text-gh-gray-2">
                        {props.view}
                    </p>
                </div>
            </div>
        </div>
        <div className="post-column w-5/12 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg md:w-3/12">
            <div id={"article-info-" + props.id}>
                <div className="flex flex-row justify-between items-center gap-1">
                        <div className={props.admin ? "w-2/3" : "w-full"} >
                            <div className="article-info-list-item">
                                <i className="fa-regular fa-paper-plane"></i>
                                <a
                                    href={
                                        props.uid < 0
                                            ? "signin"
                                            : `user.html?uid=${props.author}`
                                    }
                                    className="ml-1 font-bold"
                                >
                                    {props.author_name}{" "}
                                    {props.uid ==
                                    props.author
                                        ? "(you)"
                                        : ""}
                                </a>
                            </div>

                            <div className="article-info-list-item md:mb-0">
                                <i className="fa-regular fa-calendar-days"></i>
                                <p className="ml-1 inline">
                                    {formatTime(props.ctime)}
                                </p>
                            </div>
                            <div className="mb-1 text-sm md:hidden md:text-base">
                                <i className="fa-regular fa-comments"></i>
                                <p className="ml-1 inline">
                                    {props.ccount}
                                </p>
                            </div>
                            <div className="text-sm md:hidden md:text-base">
                                <i className="fa-regular fa-eye"></i>
                                <p className="ml-1 inline">
                                    {props.view}
                                </p>
                            </div>
                        </div>

                    {props.admin && (
                       <DeleteButton postId={props.id} postTitle={props.title} />
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}