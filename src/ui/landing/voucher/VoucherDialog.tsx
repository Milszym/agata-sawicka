/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { MyButton } from '../../components/button/MyButton';
import { Image } from '../../Images';
import { BOOKSY_URL } from '../reviews/Reviews';
import { openUrl } from '../../../util/openLink';

interface VoucherDialogProps {
    open: boolean;
    onClose: () => void;
}

const DialogTitleStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    font-family: ${theme.typography.h1.fontFamily};
    padding: 16px 24px;
    position: relative;
    text-align: center;
    font-size: 1.5rem;
    
    ${mobileCss(`
        font-size: 1.3rem;
        padding: 12px 20px;
    `)}
`);

const CloseButtonStyle = withMyTheme((theme) => css`
    position: absolute;
    right: 2.5vh;
    width: 22px;
    aspect-ratio: 1/1;
    height: auto;
    top: 1.5vh;
    bottom: 1.5vh;
    color: ${theme.palette.primary.contrastText};
    ${mobileCss(`
        display: none;
    `)}
`);

const DialogContentStyle = withMyTheme((theme) => css`
    padding: 24px;
    font-family: ${theme.typography.body1.fontFamily};
    color: ${theme.palette.text.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    
    ${mobileCss(`
        padding: 16px;
    `)}
`);

const InstructionsStyle = withMyTheme((theme) => css`
    margin-bottom: 1.5vh;
    font-size: 1rem;
    font-family: ${theme.typography.body1.fontFamily};
    line-height: 1.6;
    text-align: center;
    
    ${mobileCss(`
        font-size: 4vw;
    `)}
`);

const ButtonContainerStyle = css`
    display: flex;
    justify-content: center;
`;

const BookingButtonStyle = withMyTheme((theme) => css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    padding: 10px 24px;
    font-size: .8vw;
    
    &:hover {
        background-color: ${theme.palette.primary.dark};
    }
    
    ${mobileCss(`
        font-size: 4vw;
        padding: 8px 16px;
        margin-bottom: 1.5vh;
    `)}
`);

const BookingIconStyle = css`
    width: auto;
    height: 1.8vh;
    padding: 2px 0 0 0;
    margin: 0;
    object-fit: contain;
    filter: brightness(0) invert(1);
    ${mobileCss(`
        height: 18px;
    `)}
`;

const HighlightStyle = withMyTheme((theme) => css`
    font-weight: 600;
    color: ${theme.palette.primary.dark};
`);

export const VoucherDialog = ({ open, onClose }: VoucherDialogProps) => {
    const handleOpenBooksy = () => {
        openUrl(BOOKSY_URL);
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    margin: 0
                }
            }}
        >
            <DialogTitle css={DialogTitleStyle}>
                Instrukcja zakupu vouchera
                <IconButton 
                    onClick={onClose} 
                    css={CloseButtonStyle}
                    aria-label="zamknij"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent css={DialogContentStyle}>
                <div css={InstructionsStyle}>
                    <p>
                        Po kliknięciu przycisku "Otwórz Booksy" zostaniesz przekierowany/a na stronę Booksy.
                    </p>
                    <p>
                        Na stronie Booksy znajdź sekcję <span css={HighlightStyle}>"Karty podarunkowe"</span> i kliknij przycisk <span css={HighlightStyle}>"Zobacz karty"</span>.
                    </p>
                    <p>
                        Następnie wybierz interesujący Cię voucher i postępuj zgodnie z instrukcjami, aby dokończyć zakup.
                    </p>
                </div>
                <div css={ButtonContainerStyle}>
                    <MyButton
                        text="Otwórz Booksy"
                        onClick={handleOpenBooksy}
                        variant="contained"
                        additionalCss={BookingButtonStyle}
                        endIcon={
                            <img
                                src={Image.BOOKSY_LOGO}
                                alt="Booksy Logo"
                                css={BookingIconStyle}
                            />
                        }
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
