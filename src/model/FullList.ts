import ListItem from "./ListItem";

// if you are wondering why all these methods have 
// a void return type well that's becuase these operations
// are going to performed on DOM and usually we don't want
// to return anything from such functions all they do is
// DOM manipulation.
interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

// export default class FullList implements List {
//     constructor(private _list: ListItem[] = []) {
//         this._list = _list
//     }

//     get list(): ListItem[] {
//         return this._list;
//     }

//     set list(list: ListItem[]) {
//         this._list = list;
//     }

//     load(): void {}
//     save(): void {}
//     clearList(): void {
//         this._list = [];
//     }

//     addItem(itemObj: ListItem): void {
//         this._list.push(itemObj);
//     }

//     removeItem(id: string): void {
//         const removeIndex = this._list.findIndex(item => item.id === id);

//         if(removeIndex !== -1) {
//             this._list.splice(removeIndex, 1);
//         }
//     }
// }

// We want a singleton list ie only once instance of this class
export default class FullList implements List {
    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []) {}

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if(typeof storedList !== "string") return;
        
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList);

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)

            // referring to our only instance of list
            FullList.instance.addItem(newListItem);
        })
    }

    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}