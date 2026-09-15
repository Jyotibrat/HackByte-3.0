'use client';;
import * as React from 'react';
import { HoverCard as HoverCardPrimitive } from 'radix-ui';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';

import { getStrictContext } from '@/lib/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';

const [HoverCardProvider, useHoverCard] =
  getStrictContext('HoverCardContext');

function HoverCard({
  followCursor = false,
  followCursorSpringOptions = { stiffness: 200, damping: 17 },
  ...props
}) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <HoverCardProvider
      value={{
        isOpen,
        setIsOpen,
        x,
        y,
        followCursor,
        followCursorSpringOptions,
      }}
    >
      <HoverCardPrimitive.Root
        data-slot="hover-card"
        {...props}
        onOpenChange={setIsOpen}
      />
    </HoverCardProvider>
  );
}

function HoverCardTrigger({
  onMouseMove,
  ...props
}) {
  const { x, y, followCursor } = useHoverCard();

  const handleMouseMove = (event) => {
    onMouseMove?.(event);

    const target = event.currentTarget.getBoundingClientRect();

    if (followCursor === 'x' || followCursor === true) {
      const eventOffsetX = event.clientX - target.left;
      const offsetXFromCenter = (eventOffsetX - target.width / 2) / 2;
      x.set(offsetXFromCenter);
    }

    if (followCursor === 'y' || followCursor === true) {
      const eventOffsetY = event.clientY - target.top;
      const offsetYFromCenter = (eventOffsetY - target.height / 2) / 2;
      y.set(offsetYFromCenter);
    }
  };

  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      onMouseMove={handleMouseMove}
      {...props}
    />
  );
}

function HoverCardPortal(props) {
  const { isOpen } = useHoverCard();

  return (
    <AnimatePresence>
      {isOpen && (
        <HoverCardPrimitive.Portal
          forceMount
          data-slot="hover-card-portal"
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

function HoverCardContent({
  align,
  alignOffset,
  side,
  sideOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  style,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}) {
  const { x, y, followCursor, followCursorSpringOptions } = useHoverCard();
  const translateX = useSpring(x, followCursorSpringOptions);
  const translateY = useSpring(y, followCursorSpringOptions);

  return (
    <HoverCardPrimitive.Content
      asChild
      forceMount
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      avoidCollisions={avoidCollisions}
      collisionBoundary={collisionBoundary}
      collisionPadding={collisionPadding}
      arrowPadding={arrowPadding}
      sticky={sticky}
      hideWhenDetached={hideWhenDetached}
    >
      <motion.div
        key="hover-card-content"
        data-slot="hover-card-content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={transition}
        style={{
          x:
            followCursor === 'x' || followCursor === true
              ? translateX
              : undefined,
          y:
            followCursor === 'y' || followCursor === true
              ? translateY
              : undefined,
          ...style,
        }}
        {...props}
      />
    </HoverCardPrimitive.Content>
  );
}

function HoverCardArrow(props) {
  return <HoverCardPrimitive.Arrow data-slot="hover-card-arrow" {...props} />;
}

export { HoverCard, HoverCardTrigger, HoverCardPortal, HoverCardContent, HoverCardArrow, useHoverCard };
