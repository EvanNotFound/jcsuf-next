import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



export default function ArticleColumnLoading() {
    return (
        <div
        className="mx-2 flex flex-row justify-between md:mx-6"
    >
        <div
            className="post-column w-7/12 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg"
        >
            <h4 className="mb-1 text-center text-lg font-bold">
                <Skeleton />
            </h4>
            <p className="text-center text-sm">
                <Skeleton />
            </p>
        </div>
        <div
            className="gh-border m-2.5 hidden w-2/12 max-w-[135px] flex-col justify-center rounded-xl bg-white px-2 py-3 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg md:flex"
        >
            <div className="flex flex-wrap justify-center gap-1.5">
                <div className="article-info-stats-item-loading">
                    <Skeleton containerClassName="flex-1" />
                </div>

                <div className="article-info-stats-item-loading">
                    <Skeleton containerClassName="flex-1" />
                </div>
                <div className="article-info-stats-item-loading">
                    <Skeleton containerClassName="flex-1" />
                </div>
                <div className="article-info-stats-item-loading">
                    <Skeleton containerClassName="flex-1" />
                </div>
            </div>
        </div>
        <div className="post-column w-5/12 dark:border-gh-gray-7 dark:bg-gh-subtledarkbg md:w-3/12">
            <div>
                <div className="flex flex-row justify-between items-center gap-1">
                        <div className="w-full" >
                            <div className="article-info-list-item">
                                <Skeleton containerClassName="flex-1" />
                            </div>

                            <div className="article-info-list-item md:mb-0">
                                <Skeleton containerClassName="flex-1" />
                            </div>
                            <div className="mb-1 text-sm md:hidden md:text-base">
                                <Skeleton containerClassName="flex-1" />
                            </div>
                            <div className="text-sm md:hidden md:text-base">
                                <Skeleton containerClassName="flex-1" />
                            </div>
                        </div>

                    {/* {props.canDelete && (
                        <button
                            id={`delete-btn-${props.id}`}
                            className="float-right bg-gh-gray-1 gh-border dark:border-gh-darkborder dark:bg-gh-red-8 dark:hover:bg-gh-gray-8 px-2 py-1 rounded-xl text-gh-gray-9 hover:bg-gh-red-6 hover:text-white w-1/3"
                            data-id={props.id}
                        >
                            删除
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    </div>
    )
}