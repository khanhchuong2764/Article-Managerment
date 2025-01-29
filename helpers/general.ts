export const CreateStringRamdom = (length:number) : string => {
    const characters:string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result:string = "";
    for (var i= 0 ; i <length ;i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export const CreateNumberRamdom = (length : number): string=> {
    const characters:string = "0123456789";
    let result:string = "";
    for (var i= 0 ; i <length ;i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}