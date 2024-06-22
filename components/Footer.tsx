import { MdCopyright } from "react-icons/md";
import { VscGithub } from "react-icons/vsc";

function Footer() {
  return (
    <footer className='h-10 bg-[#358f80] fixed bottom-0 w-full flex items-center text-white px-2 md:px-10'>
        <div className="flex items-center flex-1">
            <MdCopyright/>
            <p>Made by Amit Kumar Rout</p>
        </div>
        <div>
            <VscGithub/>
        </div>
    </footer>
  )
}

export default Footer
