import Link from "next/link"

export const Header = () => {
  return (
    <header className="flex justify-between items-center bg-gray-950 px-10 py-4">
      <Link href='/' className="text-white text-2xl">Todo App</Link>
      <Link href="/create" className="inline-block bg-amber-400 px-6 py-2 rounded-md text-center">作成ページへ</Link>
    </header>
  )
}