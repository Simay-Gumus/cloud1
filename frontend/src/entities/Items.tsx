export default interface Item {
    _id?: string;
    itemType: string;
    name: string;
    description: string;
    price: number;
    seller: string;
    image: string;
    batteryLife?: string;
    age?: number;
    size?: number;
    material?: string;

}
