export const incrementArray = (array: string[], property: string) => {
    let counts: any = {};
    array.forEach((item) => {
        let pname = `${property}-${item.split(" ").join("_")}`;
        counts[pname] = 1;
    });
    return counts;
};
