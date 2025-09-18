/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { withMyTheme } from '../theme/theme';
import { mobileCss } from '../theme/isMobile';
import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { MyButton } from '../components/button/MyButton';

const ContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
    background-color: ${theme.palette.background.default};
`);

const ContentStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.main};
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 900px;
    margin-top: 2rem;
    
    ${mobileCss(`
        padding: 1.5rem;
        max-width: 95%;
    `)}
`);

const TitleStyle = withMyTheme((theme) => css`
    font-size: 2rem;
    font-weight: 600;
    color: ${theme.palette.secondary.contrastText};
    margin-bottom: 1.5rem;
    text-align: center;
    font-family: ${theme.typography.h1.fontFamily};
`);

const LoadingContainerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`;

const ErrorMessageStyle = withMyTheme((theme) => css`
    color: ${theme.palette.error.main};
    margin: 2rem 0;
    text-align: center;
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 1.2rem;
`);

const JsonViewerStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.background.paper};
    border-radius: 8px;
    padding: 1.5rem;
    overflow: auto;
    max-height: 70vh;
    font-family: monospace;
    white-space: pre-wrap;
    color: ${theme.palette.text.primary};
    font-size: 14px;
    line-height: 1.5;
`);

const ButtonContainerStyle = css`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 1rem;
`;

const ButtonStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.dark};
    color: ${theme.palette.primary.contrastText};
    &:hover {
        background-color: ${theme.palette.primary.main};
    }
`);

export const ConfigViewer = () => {
    const [configData, setConfigData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const username = sessionStorage.getItem('github_username');
        const token = sessionStorage.getItem('github_token');

        if (!username || !token) {
            setRedirect(true);
            return;
        }

        const fetchConfig = async () => {
            try {
                // First, we need to get the repository content
                const response = await fetch(
                    'https://api.github.com/repos/' + 
                    username + 
                    '/agata-sawicka-website-code/contents/src/offers/offersConfig.json',
                    {
                        headers: {
                            'Authorization': `token ${token}`,
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch config file. Please check repository structure.');
                }

                const fileData = await response.json();
                
                // GitHub API returns content as base64 encoded
                const decodedContent = atob(fileData.content);
                
                // Parse JSON content
                const parsedConfig = JSON.parse(decodedContent);
                setConfigData(parsedConfig);
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('github_username');
        sessionStorage.removeItem('github_token');
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/super-admin" />;
    }

    return (
        <div css={ContainerStyle}>
            <h1 css={TitleStyle}>Offers Configuration</h1>
            
            <div css={ContentStyle}>
                {isLoading ? (
                    <div css={LoadingContainerStyle}>
                        <CircularProgress />
                    </div>
                ) : errorMessage ? (
                    <div css={ErrorMessageStyle}>{errorMessage}</div>
                ) : (
                    <pre css={JsonViewerStyle}>
                        {JSON.stringify(configData, null, 2)}
                    </pre>
                )}
                
                <div css={ButtonContainerStyle}>
                    <MyButton
                        text="Back to Login"
                        variant="contained"
                        colorVariant="primary"
                        additionalCss={ButtonStyle}
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
};
