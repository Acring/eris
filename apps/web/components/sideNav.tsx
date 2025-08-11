'use client';
import { cn } from '@xsky/eris-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  name: string;
  value: string;
  path: string;
}
export interface SideNavProps {
  groups: { name?: React.ReactNode; icon?: React.ReactNode; items: NavItem[]; value: string }[];
}

export default function SideNav({ groups }: SideNavProps) {
  const pathname = usePathname();
  return (
    <nav className="[&>*_+_*]:mt-2">
      {groups.map((group) => (
        <div key={group.value}>
          <div className="flex items-center">
            {group.icon ? <div className="text-primary-normal mr-1">{group.icon}</div> : null}
            {group.name ? <div className="text-subhead font-bold">{group.name}</div> : null}
          </div>
          <div className="mt-1">
            {group.items.map((item) => (
              <div
                className={cn(
                  'hover:text-primary-hover rounded-sm px-3 py-[6px] hover:bg-purple-100',
                  {
                    'text-primary-hover bg-purple-50': pathname === item.path,
                  },
                )}
                key={item.value}
              >
                <Link href={item.path}>
                  <div>{item.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
