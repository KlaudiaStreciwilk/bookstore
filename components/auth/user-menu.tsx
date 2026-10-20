'use client'

import { BookMarked, LogOut, Settings } from 'lucide-react'
import { Menu } from '@base-ui/react/menu'
import { signOut } from '@/lib/auth/actions'
import type { User } from '@/lib/auth/types'

export function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toLocaleUpperCase('pl')).join('')
}

// Avatar + dropdown for a logged-in user. Base UI handles focus, arrow keys and Escape.
export function UserMenu({ user }: { user: User }) {
  return (
    <Menu.Root>
      <Menu.Trigger className="avatar-button" aria-label={`Menu konta: ${user.name}`}>{getInitials(user.name)}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="user-menu-positioner" side="bottom" align="end" sideOffset={10}>
          <Menu.Popup className="user-menu-popup">
            <div className="user-menu-header"><strong>{user.name}</strong><span>{user.email}</span></div>
            <Menu.LinkItem className="user-menu-item" href="#"><BookMarked aria-hidden="true" /> Moja biblioteka</Menu.LinkItem>
            <Menu.LinkItem className="user-menu-item" href="#"><Settings aria-hidden="true" /> Ustawienia konta</Menu.LinkItem>
            <Menu.Separator className="user-menu-separator" />
            <Menu.Item className="user-menu-item" onClick={() => { void signOut() }}><LogOut aria-hidden="true" /> Wyloguj się</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
