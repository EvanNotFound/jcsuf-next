'use client'
import Header from "@/components/header/Header"
import SignInBox from "@/components/auth/SignInBox"
import Link from "next/link"



const SignIn = () => {

    return (
        <div>
            <Header />
            <main className="flex justify-center items-center h-screen flex-col gap-3">
                <div className="text-center text-2xl font-bold">
                        登录到 JCSUF
                    </div>
                <div className="py-6 px-7 gh-border dark:border-gh-darkborder rounded-xl bg-gh-bg dark:bg-gh-darkbg flex flex-col gap-2 w-full sm:w-1/3">
                    <SignInBox />
                </div>
                <div className="py-4 px-6 gh-border dark:border-gh-darkborder rounded-xl flex flex-row justify-center gap-2 w-full sm:w-1/3">
                    还没有账号？<Link href="/auth/signup" className="text-blue-500 hover:underline">注册</Link>
                </div>
            </main>
        </div>
    )
}

export default SignIn;