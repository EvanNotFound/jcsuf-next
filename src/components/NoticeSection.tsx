import { getNoticeData } from '@/lib/notice'

export default async function NoticeSection() {
    const noticeData = await getNoticeData()

    return (
        <section
        className="z-30 hidden w-3/12 border-r-[1.5px] border-solid border-gh-border bg-white p-5 dark:border-gh-darkborder dark:bg-gh-subtledarkbg md:block"
    >
        <div id="notice" className="sticky top-[100px]">
            <h1 className="mb-0 text-center text-lg font-bold">入站须知</h1>
            <div id="notice-content" className="text-sm" dangerouslySetInnerHTML={{ __html: noticeData.text }}>
            </div>
            <div
                id="notice-modify-time"
                className="text-right font-mono text-sm text-gh-gray-5"
            ></div>
        </div>
    </section>
    )
}