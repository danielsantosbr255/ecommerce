class CurrencyUtil {
    static formatCurrencyWithoutSymbol(value: number) {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            currencyDisplay: "code",
        });
    }

    static formatCurrency(value: number, locale = "pt-BR", currency = "BRL") {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
        }).format(value);
    }
}

export default CurrencyUtil;
