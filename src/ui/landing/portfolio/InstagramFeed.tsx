/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ShortcodeContent } from '../../components/ShortcodeContent';
import { withMyTheme } from '../../theme/theme';

const InstagramFeedShortcode = '[instagram-feed feed=1]'

const IframeStyle = withMyTheme(() => css`
    width: 100vw;
    height: 100vh;
    border: none;
`)

export const InstagramFeed = () => {
    return <>
        <iframe src="http://localhost/wordpress-test/118-2/" css={IframeStyle} />
    </>
};
