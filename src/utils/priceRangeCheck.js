const priceRangeCheck = (tokenPrice, wbnbPrice) => {
    const result = tokenPrice * wbnbPrice;
    let price = 0;

    if (result > 10) {
        price = parseFloat(result).toFixed(2)
    } else if (price > 1) {
        price = parseFloat(result).toFixed(4)
    } else {
        price = parseFloat(result).toFixed(7)
    }

    if (price * 2 === 0) return 0;
    return price;
}

export default priceRangeCheck;