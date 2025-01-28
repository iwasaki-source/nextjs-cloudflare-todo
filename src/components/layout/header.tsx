import Link from "next/link"

export const Header = () => {
  return (
    <header className="bg-gray-950 text-white p-4">
      <Link href='/'>Todo App</Link>
    </header>
  )
}