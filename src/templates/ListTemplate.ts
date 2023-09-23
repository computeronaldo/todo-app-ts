import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();

        // getter method for fullList
        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            // using getter and setter we created inside ListItem class 
            // so we use item.id instead of using _id
            check.id = item.id;

            // same here we use checked instead of _checked as getter 
            // function for _checked private property was named checked
            check.checked = item.checked;
            check.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
                // this.render(fullList);
            });

            li.append(check)

            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;

            li.append(label);

            const btn = document.createElement("button") as HTMLButtonElement;
            btn.className = 'button';
            btn.textContent= 'X';

            btn.addEventListener('click', () => {
                // removing list item from fullList
                fullList.removeItem(item.id);
                // also update our ui
                this.render(fullList);
            });
            li.append(btn);

            this.ul.append(li);
        })
    }
}


// <li class="item">
//    <input type="checkbox" id="2">
//    <label for="2">sleep</label>
//    <button class="button">X</button>
//  </li>