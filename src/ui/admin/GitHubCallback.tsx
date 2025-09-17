/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { withMyTheme } from '../theme/theme';
import Cookies from 'js-cookie';
import { simulateTokenExchange } from './AuthService';

const ContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: ${theme.palette.background.default};
    padding: 2rem;
    text-align: center;
`);

const MessageStyle = withMyTheme((theme) => css`
    font-size: 1.5rem;
    color: ${theme.palette.text.primary};
    margin-bottom: 1rem;
    font-family: ${theme.typography.body1.fontFamily};
`);

const ErrorStyle = withMyTheme((theme) => css`
    font-size: 1.5rem;
    color: ${theme.palette.error.main};
    margin-bottom: 1rem;
    font-family: ${theme.typography.body1.fontFamily};
`);

export const GitHubCallback = () => {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const code = searchParams.get('code');
                const state = searchParams.get('state');
                const storedState = Cookies.get('github_oauth_state');
                
                // Verify state parameter to prevent CSRF attacks
                if (!state || state !== storedState) {
                    setError('Invalid state parameter. Authentication failed.');
                    return;
                }
                
                if (!code) {
                    setError('No code provided by GitHub');
                    return;
                }
                
                // In a real application, you would exchange the code for a token
                // using a backend service to keep your client secret secure
                
                // For this example, we'll simulate a successful token exchange
                // and store the token in localStorage
                
                // Normally, you would make a request to your backend:
                // const response = await fetch('/api/github/callback', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ code })
                // });
                // const data = await response.json();
                // if (data.access_token) {
                //   localStorage.setItem('github_token', data.access_token);
                //   navigate('/super-admin-panel');
                // }
                
                // Use our AuthService to simulate a token exchange
                const token = simulateTokenExchange(code);
                localStorage.setItem('github_token', token);
                
                // Clear the state cookie
                Cookies.remove('github_oauth_state');
                
                // Redirect to the admin panel
                navigate('/super-admin-panel');
            } catch (err) {
                console.error('Error during GitHub authentication:', err);
                setError('Authentication failed. Please try again.');
            }
        };
        
        fetchToken();
    }, [searchParams, navigate]);

    return (
        <div css={ContainerStyle}>
            {error ? (
                <p css={ErrorStyle}>{error}</p>
            ) : (
                <p css={MessageStyle}>Authenticating with GitHub...</p>
            )}
        </div>
    );
};
