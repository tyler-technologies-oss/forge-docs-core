import React, { FC } from 'react';
import classnames from 'classnames';

import * as styles from './ImageBlock.module.scss';

interface ImageCaptionArgs {
  caption: string;
}

export const ImageCaption: FC<ImageCaptionArgs> = ({ caption }) => {
  return <p className={classnames('tyl-typography--body', styles.caption)} dangerouslySetInnerHTML={{__html: caption}}></p>;
};

interface ImageBlockArgs {
  caption?: string;
  padded?: boolean;
  stretch?: boolean;
  maxWidth?: string;
}

export const ImageBlock: FC<ImageBlockArgs> = ({ children, caption, padded = true, stretch, maxWidth = '100%' }) => {
  const imageContainerClasses = classnames(
    styles.imageContainer,
    {
      [styles.imageContainerPadded]: padded,
      [styles.imageContainerStretch]: stretch
    }
  );
  return (
    <div className={styles.container}>
      <div className={styles.captionContainer}>
      <div className={imageContainerClasses}>
        <div className={styles.imageWrapper} style={{maxWidth: maxWidth}}>{children}</div>
      </div>
      {caption && <ImageCaption caption={caption} />}
    </div>
    </div>
  );
};
