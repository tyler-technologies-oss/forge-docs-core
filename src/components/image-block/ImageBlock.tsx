import React, { FC } from 'react';
import classnames from 'classnames';

// import styles from './ImageBlock.module.scss';

export interface ImageCaptionArgs {
  caption: string;
}

export const ImageCaption: FC<ImageCaptionArgs> = ({ caption }) => {
  return <p className={classnames('tyl-typography--body', 'caption')} dangerouslySetInnerHTML={{__html: caption}}></p>;
};

export interface ImageBlockArgs {
  caption?: string;
  padded?: boolean;
  stretch?: boolean;
  maxWidth?: string;
}

export const ImageBlock: FC<ImageBlockArgs> = ({ children, caption, padded = true, stretch, maxWidth = '100%' }) => {
  const imageContainerClasses = classnames(
    'image-container',
    {
      'image-container--padded': padded,
      'image-container--stretch': stretch
    }
  );
  return (
    <div className={'container'}>
      <div className={'caption-container'}>
      <div className={imageContainerClasses}>
        <div className={'image-wrapper'} style={{maxWidth: maxWidth}}>{children}</div>
      </div>
      {caption && <ImageCaption caption={caption} />}
    </div>
    </div>
  );
};
