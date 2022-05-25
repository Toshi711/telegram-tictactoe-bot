function shaffle(arr : any[]): any{

    const item = arr[Math.floor(Math.random()*arr.length)];

    return item
}

export default shaffle;