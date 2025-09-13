/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { withMyTheme } from '../theme/theme';
import { mobileCss } from '../theme/isMobile';

const DialogTitleStyle = withMyTheme((theme) => css`
    font-family: ${theme.typography.h1.fontFamily};
    padding: 20px 24px;
    margin: 0;
    color: ${theme.palette.text.primary};
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`);

const DialogContentStyle = withMyTheme((theme) => css`
    padding: 24px;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 1rem;
    line-height: 1.6;
    max-height: 60vh;
    overflow-y: auto;

    ${mobileCss(`
        padding: 16px;
        font-size: 0.9rem;
    `)}
`);

const DialogContentTitleStyle = withMyTheme((theme) => css`
    font-family: ${theme.typography.h1.fontFamily};
    font-size: 1.5rem;
    margin: 0;
    color: ${theme.palette.text.primary};
`);

interface PrivacyPolicyDialogProps {
    open: boolean;
    onClose: () => void;
}

export const PrivacyPolicyDialog: React.FC<PrivacyPolicyDialogProps> = ({ open, onClose }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <div css={DialogTitleStyle}>
                Polityka Prywatności
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </div>
            <DialogContent css={DialogContentStyle}>
                <h3 css={DialogContentTitleStyle}>1. Informacje ogólne</h3>
                <p>
                    Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: agatasawicka.pl
                    Operatorem serwisu oraz Administratorem danych osobowych jest: Agata Sawicka.
                    Adres kontaktowy poczty elektronicznej operatora: agatasawicka.ols@gmail.com
                </p>

                <h3>2. Rodzaj przetwarzanych danych</h3>
                <p>
                    Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.
                    Dane zbierane podczas kontaktu przez formularz obejmują:
                    - Imię (opcjonalnie)
                    - Adres email
                    - Treść wiadomości
                </p>

                <h3>3. Cel przetwarzania danych</h3>
                <p>
                    Dane osobowe są przetwarzane w celu:
                    - Udzielenia odpowiedzi na przesłane zapytanie
                    - Realizacji usługi lub umówienia spotkania, jeśli takie zostało zawarte w treści wiadomości
                </p>

                <h3>4. Podstawa prawna przetwarzania danych</h3>
                <p>
                    Podstawą prawną przetwarzania danych osobowych jest:
                    - Zgoda użytkownika (art. 6 ust. 1 lit. a RODO)
                    - Prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO)
                </p>

                <h3>5. Okres przechowywania danych</h3>
                <p>
                    Dane osobowe są przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane,
                    a następnie przez okres wymagany przez przepisy prawa lub do momentu przedawnienia roszczeń.
                </p>

                <h3>6. Prawa użytkownika</h3>
                <p>
                    Użytkownik ma prawo do:
                    - Dostępu do swoich danych osobowych
                    - Sprostowania danych
                    - Usunięcia danych
                    - Ograniczenia przetwarzania danych
                    - Przenoszenia danych
                    - Wniesienia sprzeciwu
                    - Cofnięcia zgody na przetwarzanie danych
                </p>

                <h3>7. Kontakt w sprawie danych osobowych</h3>
                <p>
                    W sprawach związanych z ochroną danych osobowych można kontaktować się z Administratorem
                    pod adresem email: agatasawicka.ols@gmail.com
                </p>
            </DialogContent>
        </Dialog>
    );
};
