/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withMyTheme } from '../../theme/theme';
import { mobileCss } from '../../theme/isMobile';
import { MyInput } from '../../components/input/MyInput';
import { MyButton } from '../../components/button/MyButton';

const FormContainerStyle = withMyTheme((theme) => css`
    flex: 1;
    background-color: ${theme.palette.secondary.main};
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    
    ${mobileCss(`
        max-width: none;
        padding: 30px;
    `)}
`);

const FormTitleStyle = withMyTheme((theme) => css`
    font-size: 2rem;
    font-weight: 600;
    color: ${theme.palette.secondary.contrastText};
    margin-bottom: 30px;
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
    margin-bottom: 30px;
`);

const InputFieldStyle = withMyTheme((theme) => css`
    & .MuiInputLabel-root {
        color: ${theme.palette.secondary.contrastText};
    }
    & .MuiOutlinedInput-root {
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

export const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // You can add actual form submission logic here
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
                    label={t('contact.form.email')}
                    placeholder={t('contact.form.emailPlaceholder')}
                    onChange={handleInputChange('email')}
                    additionalCss={InputFieldStyle}
                />
                
                <MyInput
                    value={formData.message}
                    label={t('contact.form.message')}
                    placeholder={t('contact.form.messagePlaceholder')}
                    onChange={handleInputChange('message')}
                    multiline={true}
                    additionalCss={InputFieldStyle}
                />
            </div>
            
            <div css={css`display: flex; justify-content: center;`}>
                <MyButton
                    text={t('contact.form.submit')}
                    variant="contained"
                    colorVariant="primary"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};
