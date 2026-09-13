'use client'

import { Drawer } from '@base-ui/react/drawer'
import { Search, X } from 'lucide-react'
import { useCallback, useState } from 'react'

import { routes } from '@/constants/routes'
import { Button } from '@/primitives/button'
import { Input } from '@/primitives/input'
import { cn } from '@/utils/classnames'

import { useDesktopSearchDisclosure, useSearchNavigation } from './hooks'
import { searchControlMessages } from './messages'
import { searchControlStyles } from './styles'

function DesktopSearch() {
  const { closeOnBlur, closeOnEscape, input, open, setOpen } =
    useDesktopSearchDisclosure()
  const { query, setQuery, submit } = useSearchNavigation()

  return (
    <div className={searchControlStyles.desktopRoot} onBlur={closeOnBlur}>
      <form
        action={routes.search}
        method="get"
        onSubmit={submit}
        role="search"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          searchControlStyles.desktopForm,
          open
            ? searchControlStyles.desktopFormOpen
            : searchControlStyles.desktopFormClosed,
        )}
      >
        <Input
          ref={input}
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={closeOnEscape}
          aria-label={searchControlMessages.fieldLabel}
          placeholder={searchControlMessages.placeholder}
          className={searchControlStyles.desktopInput}
          tabIndex={open ? 0 : -1}
        />
        <Button
          type="submit"
          nativeButton
          variant="icon"
          aria-label={searchControlMessages.submitLabel}
          tabIndex={open ? 0 : -1}
          className={searchControlStyles.headerIconButton}
        >
          <Search aria-hidden="true" />
        </Button>
      </form>
      <Button
        type="button"
        nativeButton
        variant="icon"
        aria-label={searchControlMessages.openLabel}
        aria-expanded={open}
        aria-hidden={open || undefined}
        tabIndex={open ? -1 : 0}
        onClick={() => setOpen(true)}
        className={cn(
          searchControlStyles.desktopTrigger,
          open && searchControlStyles.desktopTriggerHidden,
        )}
      >
        <Search aria-hidden="true" className={searchControlStyles.headerIcon} />
      </Button>
    </div>
  )
}

function MobileSearch() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const { query, setQuery, submit } = useSearchNavigation(close)

  return (
    <div className={searchControlStyles.mobileRoot}>
      <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="up">
        <Drawer.Trigger
          className={searchControlStyles.mobileTrigger}
          aria-label={searchControlMessages.openLabel}
        >
          <Search
            aria-hidden="true"
            className={searchControlStyles.headerIcon}
          />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop className={searchControlStyles.backdrop} />
          <Drawer.Viewport className={searchControlStyles.viewport}>
            <Drawer.Popup className={searchControlStyles.popup}>
              <div className={searchControlStyles.mobileHeader}>
                <Drawer.Title className={searchControlStyles.drawerTitle}>
                  {searchControlMessages.drawerTitle}
                </Drawer.Title>
                <Drawer.Close
                  className={searchControlStyles.iconButton}
                  aria-label={searchControlMessages.closeLabel}
                >
                  <X aria-hidden="true" className={searchControlStyles.icon} />
                </Drawer.Close>
              </div>
              <Drawer.Description
                className={searchControlStyles.drawerDescription}
              >
                {searchControlMessages.drawerDescription}
              </Drawer.Description>
              <form
                action={routes.search}
                method="get"
                onSubmit={submit}
                role="search"
                className={searchControlStyles.mobileForm}
              >
                <Input
                  autoFocus
                  name="q"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label={searchControlMessages.fieldLabel}
                  placeholder={searchControlMessages.placeholder}
                  className={searchControlStyles.mobileInput}
                />
                <Button
                  type="submit"
                  nativeButton
                  variant="icon"
                  aria-label={searchControlMessages.submitLabel}
                >
                  <Search aria-hidden="true" />
                </Button>
              </form>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}

export function SearchControl() {
  return (
    <>
      <DesktopSearch />
      <MobileSearch />
    </>
  )
}
