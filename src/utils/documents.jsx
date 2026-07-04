import validator from 'validator';
import { onlyDigits } from './masks';

function allDigitsEqual(value) {
    return /^(\d)\1+$/.test(value);
}

export function isValidCpf(value = '') {
    const cpf = onlyDigits(value);
    if (cpf.length !== 11 || allDigitsEqual(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i += 1) sum += Number(cpf[i]) * (10 - i);
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== Number(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i += 1) sum += Number(cpf[i]) * (11 - i);
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    return digit === Number(cpf[10]);
}

export function isValidCnpj(value = '') {
    const cnpj = onlyDigits(value);
    if (cnpj.length !== 14 || allDigitsEqual(cnpj)) return false;

    const calc = (base, factors) => {
        const sum = base.split('').reduce((acc, n, i) => acc + Number(n) * factors[i], 0);
        const mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
    };

    const first = calc(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const second = calc(cnpj.slice(0, 12) + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    return first === Number(cnpj[12]) && second === Number(cnpj[13]);
}

export function isValidCpfCnpj(value = '') {
    const digits = onlyDigits(value);
    if (digits.length === 11) return isValidCpf(digits);
    if (digits.length === 14) return isValidCnpj(digits);
    return false;
}

export function normalizeTextFields(value) {
    const decodeHtmlEntities = (value) => (
        typeof value === 'string' ? validator.unescape(value) : value
    )
    if (typeof value === 'string') {
        return decodeHtmlEntities(value)
    }

    if (Array.isArray(value)) {
        return value.map(normalizeTextFields)
    }

    if (
        value &&
        typeof value === 'object' &&
        !(value instanceof Date)
    ) {
        return Object.fromEntries(
            Object.entries(value).map(([key, val]) => [
                key,
                normalizeTextFields(val),
            ])
        )
    }

    return value
}

export const calcValueTaxes = (budget, subtotal) => {
    let valueTaxes = Number(subtotal) + Number(budget.totals.shipping)
    valueTaxes -= (valueTaxes * (budget.totals.discount / 100))
    valueTaxes *= (budget.totals.taxes / 100)

    return valueTaxes.toFixed(2)
}

export const calcValueDiscount = (budget, subtotal) => {
    let valueDiscount = Number(subtotal) + Number(budget.totals.shipping)
    valueDiscount *= (budget.totals.discount / 100)

    return valueDiscount.toFixed(2)
}