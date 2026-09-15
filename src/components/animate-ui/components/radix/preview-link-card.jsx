import * as React from 'react';

import {
  PreviewLinkCard as PreviewLinkCardPrimitive,
  PreviewLinkCardTrigger as PreviewLinkCardTriggerPrimitive,
  PreviewLinkCardPortal as PreviewLinkCardPortalPrimitive,
  PreviewLinkCardContent as PreviewLinkCardContentPrimitive,
  PreviewLinkCardImage as PreviewLinkCardImagePrimitive,
} from '@/components/animate-ui/primitives/radix/preview-link-card';
import { cn } from '@/lib/utils';

function PreviewLinkCard(props) {
  return <PreviewLinkCardPrimitive {...props} />;
}

function PreviewLinkCardTrigger(props) {
  return <PreviewLinkCardTriggerPrimitive {...props} />;
}

function PreviewLinkCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}) {
  return (
    <PreviewLinkCardPortalPrimitive>
      <PreviewLinkCardContentPrimitive
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 origin-(--radix-hover-card-content-transform-origin) rounded-md border shadow-md outline-hidden overflow-hidden',
          className,
        )}
        {...props}
      />
    </PreviewLinkCardPortalPrimitive>
  );
}

function PreviewLinkCardImage(props) {
  return <PreviewLinkCardImagePrimitive {...props} />;
}

export { PreviewLinkCard, PreviewLinkCardTrigger, PreviewLinkCardContent, PreviewLinkCardImage };
