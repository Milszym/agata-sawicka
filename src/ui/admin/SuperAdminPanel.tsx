/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Octokit } from 'octokit';
import { withMyTheme } from '../theme/theme';
import { mobileCss } from '../theme/isMobile';

interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
}

interface User {
    login: string;
    avatar_url: string;
    name: string | null;
}

const ContainerStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: ${theme.palette.background.default};
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`);

const HeaderStyle = withMyTheme((theme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${theme.palette.divider};
    
    ${mobileCss(`
        flex-direction: column;
        gap: 1rem;
    `)}
`);

const TitleStyle = withMyTheme((theme) => css`
    font-size: 2.5rem;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.h1.fontFamily};
    margin: 0;
    
    ${mobileCss(`
        font-size: 2rem;
    `)}
`);

const UserInfoStyle = withMyTheme((theme) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
`);

const AvatarStyle = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const UserNameStyle = withMyTheme((theme) => css`
    font-size: 1.2rem;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
`);

const TokenContainerStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.background.paper};
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`);

const TokenTitleStyle = withMyTheme((theme) => css`
    font-size: 1.2rem;
    color: ${theme.palette.text.primary};
    margin-bottom: 0.5rem;
    font-family: ${theme.typography.body1.fontFamily};
`);

const TokenStyle = withMyTheme((theme) => css`
    font-family: monospace;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.5rem;
    border-radius: 4px;
    overflow-x: auto;
    white-space: nowrap;
    color: ${theme.palette.text.primary};
`);

const RepoListStyle = withMyTheme((theme) => css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    
    ${mobileCss(`
        grid-template-columns: 1fr;
    `)}
`);

const RepoCardStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.background.paper};
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`);

const RepoNameStyle = withMyTheme((theme) => css`
    font-size: 1.2rem;
    color: ${theme.palette.primary.main};
    margin-bottom: 0.5rem;
    font-family: ${theme.typography.h1.fontFamily};
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`);

const RepoDescriptionStyle = withMyTheme((theme) => css`
    color: ${theme.palette.text.primary};
    margin-bottom: 1rem;
    font-family: ${theme.typography.body1.fontFamily};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 4.5rem;
`);

const RepoMetaStyle = withMyTheme((theme) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${theme.palette.text.secondary};
    font-size: 0.9rem;
    font-family: ${theme.typography.body1.fontFamily};
`);

const ButtonStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: ${theme.palette.primary.dark};
    }
`);

const LoadingStyle = withMyTheme((theme) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;
    color: ${theme.palette.text.secondary};
    font-size: 1.2rem;
    font-family: ${theme.typography.body1.fontFamily};
`);

const ErrorStyle = withMyTheme((theme) => css`
    color: ${theme.palette.error.main};
    padding: 1rem;
    border-radius: 8px;
    background-color: ${theme.palette.error.light}20;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
    font-family: ${theme.typography.body1.fontFamily};
`);

export const SuperAdminPanel = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('github_token');
    
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                navigate('/super-admin');
                return;
            }
            
            try {
                const octokit = new Octokit({ auth: token });
                
                // Fetch user data
                const userResponse = await octokit.rest.users.getAuthenticated();
                setUser(userResponse.data as User);
                
                // Fetch repositories
                const reposResponse = await octokit.rest.repos.listForAuthenticatedUser({
                    sort: 'updated',
                    per_page: 100,
                    visibility: 'all'
                });
                
                // Filter to only show repositories owned by the user
                const ownedRepos = reposResponse.data.filter(
                    (repo: any) => repo.owner.login === userResponse.data.login
                );
                
                setRepositories(ownedRepos as Repository[]);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError('Failed to fetch data from GitHub. Your token might be invalid.');
                setLoading(false);
            }
        };
        
        fetchData();
    }, [token, navigate]);
    
    const handleLogout = () => {
        localStorage.removeItem('github_token');
        navigate('/super-admin');
    };
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    
    if (!token) {
        return null; 
    }
    
    return (
        <div css={ContainerStyle}>
            <div css={HeaderStyle}>
                <h1 css={TitleStyle}>Super Admin Panel</h1>
                {user && (
                    <div css={UserInfoStyle}>
                        <img src={user.avatar_url} alt={`${user.login}'s avatar`} css={AvatarStyle} />
                        <span css={UserNameStyle}>{user.name || user.login}</span>
                        <button css={ButtonStyle} onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
            
            <div css={TokenContainerStyle}>
                <h2 css={TokenTitleStyle}>Your GitHub Token:</h2>
                <div css={TokenStyle}>{token}</div>
            </div>
            
            {error && <div css={ErrorStyle}>{error}</div>}
            
            <h2 css={TitleStyle} style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Your Repositories</h2>
            
            {loading ? (
                <div css={LoadingStyle}>Loading repositories...</div>
            ) : repositories.length > 0 ? (
                <div css={RepoListStyle}>
                    {repositories.map(repo => (
                        <div key={repo.id} css={RepoCardStyle}>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" css={RepoNameStyle}>
                                {repo.name}
                            </a>
                            <p css={RepoDescriptionStyle}>
                                {repo.description || 'No description provided'}
                            </p>
                            <div css={RepoMetaStyle}>
                                <span>{repo.language || 'Unknown'}</span>
                                <span>⭐ {repo.stargazers_count}</span>
                                <span>Updated: {formatDate(repo.updated_at)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No repositories found.</p>
            )}
        </div>
    );
};
