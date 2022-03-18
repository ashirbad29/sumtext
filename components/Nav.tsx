import { GearIcon } from '@radix-ui/react-icons';

const Nav = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b px-6 py-1">
      <div className="font-medium tracking-wide">
        <span>✍️</span> <span className="text-sm text-gray-500">SumText</span>
      </div>
      <button className="group rounded-md p-1 text-gray-500 transition-all hover:bg-gray-200">
        <GearIcon className="h-5 w-5 group-hover:animate-spin" />
      </button>
    </nav>
  );
};

export default Nav;
