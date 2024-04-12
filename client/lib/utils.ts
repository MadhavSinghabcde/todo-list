const delay = (miliseconds: number) => {
    return new Promise(resolve => {
        setTimeout(() => resolve('Done'), miliseconds);
    })
}

export { delay };
