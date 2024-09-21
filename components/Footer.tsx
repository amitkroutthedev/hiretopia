import Link from "next/link";
import { MdCopyright } from "react-icons/md";
import { VscGithub } from "react-icons/vsc";

function Footer() {
  return (
    <footer className='h-10 bg-black fixed bottom-0 w-full flex items-center text-white px-2 md:px-10'>
        <div className="flex items-center flex-1">
            <MdCopyright/>
            <p>Made by Amit Kumar Rout</p>
        </div>
        <Link href={"https://github.com/amitkroutthedev/hiretopia"}>
            <VscGithub/>
        </Link>
    </footer>
  )
}

export default Footer
