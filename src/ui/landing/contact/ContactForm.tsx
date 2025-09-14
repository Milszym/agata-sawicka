/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { MyInput } from '../../components/input/MyInput';
import { MyButton } from '../../components/button/MyButton';
import { Checkbox, FormControlLabel } from '@mui/material';
import { PrivacyPolicyDialog } from '../../components/PrivacyPolicyDialog';

const FormContainerStyle = withMyTheme((theme) => css`
    flex: 2;
    background-color: ${theme.palette.primary.main};
    padding: 5vh 5vw;
    margin: 7vh 3vw 7vh 7vw;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    position: relative;
    width: 60vw;

    ${mobileCss(`
        max-width: 95vw;
        width: 75vw;
        margin: 2vh 0 .5vh 0;
    `)}
`);

const FormTitleStyle = withMyTheme((theme) => css`
    font-size: 2rem;
    font-weight: 600;
    color: ${theme.palette.secondary.contrastText};
    margin-bottom: 30px;
    margin-top: 0;
    text-align: center;
    font-family: ${theme.typography.h1.fontFamily};
    
    ${mobileCss(`
        font-size: 1.8rem;
        margin-bottom: 20px;
    `)}
`);

const FormContentStyle = withMyTheme((theme) => css`
    color: ${theme.palette.secondary.contrastText};
    font-size: 1.1rem;
    line-height: 1.6;
    text-align: center;
    font-family: ${theme.typography.body1.fontFamily};
    margin-bottom: 30px;
`);

const FormFieldsStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 2vh;
`);

const PrivacyPolicyStyle = withMyTheme((theme) => css`
    margin: 0 0 1vh 0;
    
    .MuiFormControlLabel-label {
        font-family: ${theme.typography.body1.fontFamily};
        font-size: 1.2vw;
        color: ${theme.palette.secondary.contrastText};
        line-height: 1.4;
        ${mobileCss(`
            font-size: 3vw;    
        `)}
    }
    
    .MuiCheckbox-root {
        color: ${theme.palette.secondary.contrastText};
        
        &.Mui-checked {
            color: ${theme.palette.secondary.contrastText};
        }
    }

    ${mobileCss(`
        margin: 0 0 3.5vh 0;
    `)}
`);

const PrivacyPolicyLinkStyle = withMyTheme((theme) => css`
    color: ${theme.palette.secondary.contrastText};
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
        opacity: 0.8;
    }
`);

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

interface FormErrors {
    email?: string;
    message?: string;
}

export const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState({
        email: false,
        message: false
    });
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const validateEmail = (email: string) => {
        if (!email) {
            return 'Email jest wymagany';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Nieprawidłowy format adresu email';
        }
        return '';
    };

    const validateMessage = (message: string) => {
        if (!message.trim()) {
            return 'Wiadomość jest wymagana';
        }
        return '';
    };

    const validateField = (field: keyof typeof formData, value: string) => {
        switch (field) {
            case 'email':
                return validateEmail(value);
            case 'message':
                return validateMessage(value);
            default:
                return '';
        }
    };

    const handleInputChange = (field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (touched[field as 'email' | 'message']) {
            const error = validateField(field, value);
            setErrors(prev => ({
                ...prev,
                [field]: error
            }));
        }
    };

    const handleBlur = (field: 'email' | 'message') => () => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
        const error = validateField(field, formData[field]);
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    const isFormValid = () => {
        const emailError = validateEmail(formData.email);
        const messageError = validateMessage(formData.message);
        return !emailError && !messageError && privacyAccepted;
    };

    const handleSubmit = () => {
        // Set all fields as touched
        setTouched({
            email: true,
            message: true
        });

        // Validate all required fields
        const newErrors = {
            email: validateEmail(formData.email),
            message: validateMessage(formData.message)
        };
        setErrors(newErrors);

        if (isFormValid()) {
            console.log('Form submitted:', formData);
            // Add actual form submission logic here
        }
    };

    return (
        <div css={FormContainerStyle}>
            <h2 css={FormTitleStyle}>
                {t('contact.title')}
            </h2>
            <div css={FormContentStyle}>
                {t('contact.description')}
            </div>

            <div css={FormFieldsStyle}>
                <MyInput
                    value={formData.name}
                    label={t('contact.form.name')}
                    placeholder={t('contact.form.namePlaceholder')}
                    onChange={handleInputChange('name')}
                    additionalCss={InputFieldStyle}
                />

                <MyInput
                    value={formData.email}
                    type={"email"}
                    autocomplete={"email"}
                    label={t('contact.form.email')}
                    placeholder={t('contact.form.emailPlaceholder')}
                    onChange={handleInputChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    required
                    additionalCss={InputFieldStyle}
                />

                <MyInput
                    value={formData.message}
                    label={t('contact.form.message')}
                    placeholder={t('contact.form.messagePlaceholder')}
                    onChange={handleInputChange('message')}
                    onBlur={handleBlur('message')}
                    error={touched.message && !!errors.message}
                    helperText={touched.message && errors.message}
                    required
                    multiline={true}
                    additionalCss={InputFieldStyle}
                />
            </div>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    />
                }
                label={
                    <span>
                        Zgadzam się na przetwarzanie moich danych osobowych (adres e-mail i opcjonalnie imię) w celu udzielenia odpowiedzi na moją wiadomość. Pełne informacje znajdziesz w naszej{' '}
                        <span
                            css={PrivacyPolicyLinkStyle}
                            onClick={(e) => {
                                e.preventDefault();
                                setDialogOpen(true);
                        }}>
                            Polityce Prywatności
                        </span>
                        .
                    </span>
                }
                css={PrivacyPolicyStyle}
            />

            <div css={css`display: flex; justify-content: center;`}>
                <MyButton
                    text={t('contact.form.submit')}
                    variant="contained"
                    colorVariant="primary"
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                />
            </div>

            <PrivacyPolicyDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </div>
    );
};
