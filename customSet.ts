namespace customSet {
    export class CustomSet<T extends Image> {
        private items: { [key: string]: T } = {};
    
        private getKey(item: T): string {
            // Generate a unique key based on the image's properties.
            return `${item.width}_${item.height}_${item.data}`;
        }
    
        add(item: T): void {
            const key = this.getKey(item);
            this.items[key] = item;
        }
    
        has(item: T): boolean {
            const key = this.getKey(item);
            return key in this.items;
        }
    
        remove(item: T): void {
            const key = this.getKey(item);
            delete this.items[key];
        }
    
        clear(): void {
            this.items = {};
        }
    }
}