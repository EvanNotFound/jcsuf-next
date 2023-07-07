import Header from "@/components/header/Header"
import SignUpBox from "@/components/auth/SignUpBox"
import Link from "next/link"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '注册 - JCSUF',
    description: '注册 JCSUF 账号',
}

export default function SignUp() {
    return (
        <div>
            <Header />
            <main className="flex justify-center items-center h-screen flex-col gap-3 bg-white dark:bg-gh-subtledarkbg">
                <div className="text-center text-2xl font-bold">
                        注册 JCSUF 账号
                    </div>
                <div className="py-6 px-7 gh-border dark:border-gh-darkborder rounded-xl bg-gh-bg dark:bg-gh-darkbg flex flex-col gap-2 w-full sm:w-1/3">
                    <SignUpBox />
                </div>
                <div className="py-4 px-6 gh-border dark:border-gh-darkborder rounded-xl flex flex-row justify-center gap-2 w-full sm:w-1/3">
                    已经有账号？<Link href="/auth/signin" className="text-blue-500 hover:underline">登录</Link>
                </div>
            </main>
        </div>
    )
}