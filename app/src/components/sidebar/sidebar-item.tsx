type SidebarItemProps = {
  label: string;
  children: React.ReactNode;
};

const SidebarItem = ({ label, children }: SidebarItemProps) => {
  return (
    <li className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      {children}
      {/* <span className="text-[11px]">{label}</span> */}
    </li>
  );
};

export { SidebarItem };
