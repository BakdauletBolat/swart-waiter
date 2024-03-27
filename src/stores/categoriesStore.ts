import {reactive} from "vue";

export interface IFood {
    id: number,
    name: string
}

export interface ICategory {
    id: number,
    name: string,
    foods: IFood[]
}

export const categories  = reactive<ICategory[]>([
    {
        id: 1,
        name: 'Завтраки',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо 1'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            },
            {
                id: 6,
                name: 'Блюдо'
            },
            {
                id: 7,
                name: 'Блюдо 1'
            },
            {
                id: 8,
                name: 'Блюдо 2'
            },
            {
                id: 9,
                name: 'Блюдо 3'
            },
            {
                id: 10,
                name: 'Блюдо 4'
            },
            {
                id: 11,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 2,
        name: 'Салаты',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 3,
        name: 'Горячее',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо 1'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 4,
        name: 'Напитки',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 5,
        name: 'Напитки 4',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 6,
        name: 'Напитки 3',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
]);
