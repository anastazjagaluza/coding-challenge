export interface IPokeData {
    name: string;
    height: string;
    weight: string;
    abilities: string;
    image: string;
}

export interface ICard {
    name: string;
    url: string;
}

export interface INavigation {
    isFirstPage: boolean; 
    isLastPage: boolean;
    handleOffset: Function; 
    currentLimit: ILimit;
    handleLimit: Function; 
}

export type ILimit = 10 | 20 | 50; 
