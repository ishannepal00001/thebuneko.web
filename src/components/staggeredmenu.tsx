import { useEffect, useId } from 'react'
import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import type { MenuItem, MenuSocialItem } from '../dummydata'

function isInternalLink(link: string): boolean {
  return link.startsWith('/')
}

type StaggeredMenuProps = {
  contentId?: string
  open: boolean
  onRequestClose: () => void
  items: MenuItem[]
  socialItems: MenuSocialItem[]
  position?: 'left' | 'right'
  displaySocials?: boolean
  displayItemNumbering?: boolean
  closeOnClickAway?: boolean
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

export function StaggeredMenu({
  contentId,
  open,
  onRequestClose,
  items,
  socialItems,
  position = 'right',
  displaySocials = true,
  displayItemNumbering = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const fallbackId = useId()
  const menuId = contentId ?? fallbackId

  useEffect(() => {
    if (!open) return
    onMenuOpen?.()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onRequestClose()
    }

    if (closeOnClickAway) {
      document.addEventListener('pointerdown', onRequestClose, { once: true })
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      if (closeOnClickAway) {
        document.removeEventListener('pointerdown', onRequestClose)
      }
      document.removeEventListener('keydown', onKeyDown)
      onMenuClose?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const ease = 'ease-[cubic-bezier(0.22,1,0.36,1)]'
  const left = position === 'left'
  const slideClosed = left ? '-translate-x-full' : 'translate-x-full'

  return (
    <div
      id={menuId}
      aria-hidden={!open}
      className={`fixed inset-y-0 z-50 w-[min(420px,90vw)] transition-transform duration-500 ${ease} ${
        left ? 'left-0' : 'right-0'
      } ${open ? 'translate-x-0 shadow-2xl' : slideClosed}`}
    >
      <div className="flex h-full flex-col justify-between overflow-y-auto bg-primary px-10 py-12">
        <div>
          <button
            type="button"
            onClick={onRequestClose}
            aria-label="Close menu"
            className="mb-10 ml-auto flex h-10 w-10 items-center justify-center text-background outline-none transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>

          <ul className="flex flex-col gap-1">
            {items.map((item, index) => (
              <li
                key={item.label}
                className={`flex items-baseline gap-5 transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: open ? `${400 + index * 80}ms` : '0ms',
                }}
              >
                {displayItemNumbering && (
                  <span className="text-sm font-semibold text-secondary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                {isInternalLink(item.link) ? (
                  <Link
                    to={item.link as '/'}
                    aria-label={item.ariaLabel}
                    onClick={onRequestClose}
                    activeProps={{ className: '!text-accent' }}
                    className="text-4xl font-semibold uppercase tracking-[0.02em] text-background transition-colors duration-200 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onClick={onRequestClose}
                    className="text-4xl font-semibold uppercase tracking-[0.02em] text-background transition-colors duration-200 hover:text-accent"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {displaySocials && socialItems.length > 0 && (
          <ul className="flex gap-6">
            {socialItems.map((social, index) => (
              <li
                key={social.label}
                className={`transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: open ? `${1000 + index * 90}ms` : '0ms',
                }}
              >
                <a
                  href={social.link}
                  aria-label={social.ariaLabel}
                  onClick={onRequestClose}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium uppercase tracking-[0.15em] text-background transition-colors duration-200 hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
