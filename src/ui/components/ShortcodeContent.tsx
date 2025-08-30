
import React, { useState, useEffect } from 'react';
import { Config } from '../Config';

export const ShortcodeContent = ({ shortcode }: { shortcode: string }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchShortcodeContent = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}/wp-json/myplugin/v1/shortcode/?shortcode=${encodeURIComponent(shortcode)}`);
                const html = (await response.json()).html;
                setContent(html);
            } catch (error) {
                console.error('Error fetching shortcode content:', error);
            }
        };

        if (shortcode) {
            fetchShortcodeContent();
        }
    }, [shortcode]);

    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
};
