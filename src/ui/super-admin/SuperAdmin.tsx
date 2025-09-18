/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { withMyTheme } from '../theme/theme';
import { mobileCss } from '../theme/isMobile';
import { MyInput } from '../components/input/MyInput';
import { MyButton } from '../components/button/MyButton';
import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';

const ContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: ${theme.palette.background.default};
`);

const FormStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.main};
    padding: 3rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 500px;
    
    ${mobileCss(`
        padding: 2rem;
        max-width: 90%;
    `)}
`);

const TitleStyle = withMyTheme((theme) => css`
    font-size: 2rem;
    font-weight: 600;
    color: ${theme.palette.secondary.contrastText};
    margin-bottom: 2rem;
    text-align: center;
    font-family: ${theme.typography.h1.fontFamily};
`);

const FormFieldsStyle = css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const InputFieldStyle = withMyTheme((theme) => css`
    & .MuiInputLabel-root {
        color: ${theme.palette.secondary.contrastText};
        font-family: ${theme.typography.body1.fontFamily};
    }
    & .MuiOutlinedInput-root {
        font-family: ${theme.typography.body1.fontFamily};
        color: ${theme.palette.secondary.contrastText};
        & fieldset {
            border-color: ${theme.palette.secondary.contrastText};
        }
        &:hover fieldset {
            border-color: ${theme.palette.secondary.contrastText};
        }
        &.Mui-focused fieldset {
            border-color: ${theme.palette.secondary.contrastText};
        }
    }
    & .MuiInputBase-input::placeholder {
        color: ${theme.palette.secondary.contrastText};
        opacity: 0.7;
    }
`);

const ButtonStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.dark};
    color: ${theme.palette.primary.contrastText};
    position: relative;
    &:hover {
        background-color: ${theme.palette.primary.main};
    }
`);

const ErrorMessageStyle = withMyTheme((theme) => css`
    color: ${theme.palette.error.main};
    margin-top: 1rem;
    text-align: center;
    font-family: ${theme.typography.body1.fontFamily};
`);

const LoadingSpinnerStyle = withMyTheme((theme) => css`
    position: absolute;
    color: ${theme.palette.primary.contrastText};
`);

const ButtonTextStyle = withMyTheme((theme, isLoading = false) => css`
    visibility: ${isLoading ? 'hidden' : 'visible'};
`);

export const SuperAdmin = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleUsernameChange = (value: string) => {
        setUsername(value);
        setErrorMessage('');
    };

    const handleTokenChange = (value: string) => {
        setToken(value);
        setErrorMessage('');
    };

    const validateRepositories = async () => {
        if (!username || !token) {
            setErrorMessage('Please enter both username and token');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            // Fetch repositories from GitHub API
            const response = await fetch(`https://api.github.com/users/${username}/repos`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate with GitHub. Please check your credentials.');
            }

            const repositories = await response.json();
            
            // Check if required repositories exist
            const requiredRepos = ['agata-sawicka-website', 'agata-sawicka-website-code'];
            const foundRepos = requiredRepos.filter(repo => 
                repositories.some((r: any) => r.name === repo)
            );

            if (foundRepos.length === requiredRepos.length) {
                // Store credentials in session storage for later use
                sessionStorage.setItem('github_username', username);
                sessionStorage.setItem('github_token', token);
                
                // Redirect to config viewer
                setRedirect(true);
            } else {
                const missingRepos = requiredRepos.filter(repo => !foundRepos.includes(repo));
                setErrorMessage(`Missing required repositories: ${missingRepos.join(', ')}`);
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (redirect) {
        return <Navigate to="/super-admin/config" />;
    }

    return (
        <div css={ContainerStyle}>
            <div css={FormStyle}>
                <h1 css={TitleStyle}>Super Admin</h1>
                
                <div css={FormFieldsStyle}>
                    <MyInput
                        value={username}
                        label="GitHub Username"
                        placeholder="Enter your GitHub username"
                        onChange={handleUsernameChange}
                        additionalCss={InputFieldStyle}
                        required
                    />
                    
                    <MyInput
                        value={token}
                        label="GitHub Personal Access Token"
                        placeholder="Enter your PAT token"
                        onChange={handleTokenChange}
                        additionalCss={InputFieldStyle}
                        type="password"
                        required
                    />
                </div>

                {errorMessage && <div css={ErrorMessageStyle}>{errorMessage}</div>}

                <div css={css`display: flex; justify-content: center; margin-top: 1rem;`}>
                    <MyButton
                        variant="contained"
                        colorVariant="primary"
                        additionalCss={ButtonStyle}
                        onClick={validateRepositories}
                        disabled={isLoading || !username || !token}
                    >
                        {isLoading && <CircularProgress size={24} css={LoadingSpinnerStyle} />}
                        <span css={(theme) => ButtonTextStyle(theme, isLoading)}>
                            Verify Access
                        </span>
                    </MyButton>
                </div>
            </div>
        </div>
    );
};
